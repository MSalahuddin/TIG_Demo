import React from 'react';
import Box from 'components/Box';
import { Layout } from '@ui-kitten/components';
import viewTenantLeaseQuery from 'queries/tenants/viewTenantLease.gql';
import listTenantReviewsQuery from 'queries/tenants/listTenantReviews.gql';
import { useQuery } from 'urql';
import { Linking, Dimensions, Animated, TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call';
import { LEASE_STATUS } from 'constants/enums';
import Divider from 'components/Divider';
import InfiniteCarousel from 'components/InfiniteCarousel';
import Text from 'components/Text';
import Dialog from 'components/Dialog';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import format from 'date-fns/format';
import Button from 'components/Button';
import { t } from 'helpers/react';
import { button_styles } from 'styles/button';
import TenantProfileActions from './TenantProfileActions';
import ApplicationApproval from 'components/ApplicationProcess/ApplicationApproval';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import { noop } from 'lodash';
import { usaDateFormat } from 'constants/dateFormat';
import useTheme from 'hooks/useTheme';
import { useIsOpen } from 'hooks/useIsOpen';
import TenantReviews from '../TenantReviews';
import { ScrollView } from 'react-native';
import { typography } from 'styles/typography';
import useShouldRefresh from 'hooks/useShouldRefresh';
import { TENANT_INFO_TAB } from 'constants/refreshConsts';

const dims = Dimensions.get('window');
const TenantInfoTab = ({ route, navigation, data, refetchData = noop, ...props }) => {
  const theme = useTheme();
  const { isOpen, close, open } = useIsOpen();

  const carouselRef = React.useRef();
  const [modal, setModal] = React.useState(null);
  const applicationApprovalModalTypeState = React.useState('');
  const [leaseRes, executeQuery] = useQuery({
    query: viewTenantLeaseQuery,
    variables: {
      id: props?.userId,
      tenantTab: true,
      unitTab: false,
      documentsTab: false,
      activityTab: false,
    },
    pause: !props?.userId,
  });

  const onRefresh = React.useCallback(() => {
    executeQuery({
      requestPolicy: 'network-only',
    });
    carouselRef.current?.refresh?.();
  }, [executeQuery]);

  useShouldRefresh(TENANT_INFO_TAB, () => {
    executeQuery({
      requestPolicy: 'network-only',
    })
  })

  const lease = leaseRes.data?.lease;

  const tenant = lease?.tenant;
  const carouselProps = React.useMemo(
    () => ({
      query: listTenantReviewsQuery,
      variables: {
        id: lease?.id,
      },
      dataExtractor: data => data?.lease?.tenant?.receivedReviews,
      keyExtractor: item => item.id,
      renderItem: ({ item }) => {
        return (
          <Box >
            <Animated.View>
              <Box as={Layout} height={192} width={dims.width * 0.85} borderRadius={10} my={3} alignSelf="center" justifyContent="flex-start">
                <Text style={typography["body/small – bold"]} mt={2} mx={3}>
                  {item.reviewer?.fullName}
                </Text>
                <Text style={typography["body/x-small – regular"]} mx={3} mb={2}>
                  {item.comment}
                </Text>
              </Box>
            </Animated.View>
          </Box>
        );
      },
    }),
    [lease],
  );

  const onUpdateStatusSuccess = () => {
    route?.params?.refreshList?.();
    if (applicationApprovalModalTypeState[0] === "deny") {
      return navigation.navigate('ListTenants');
    } else {
      // TODO: Optimise, and don't fetch data twice. Maybe unify into a single query. 
      onRefresh()
      return refetchData()
    }
  }

  return (
    <Box as={ScrollView}>
      <FeaturesTab
        features={[
          { label: "Phone Number", content: formatPhoneNumber(tenant?.phone), onContentPress: () => call({ number: tenant?.phone }) },
          { label: "Email", content: tenant?.email, onContentPress: () => Linking.openURL(`mailto:${tenant?.email}`) },
          { label: "Occupation", content: tenant?.birthday ? format(new Date(tenant.birthday), usaDateFormat) : '' },
          { label: "Driver License", content: tenant?.drivingLicense },
          { label: "Passport Number", content: tenant?.passport },
          { label: "SSN", content: tenant?.ssn },
          { label: "Emergency Contact", content: tenant?.emergencyContact },
          { label: "Emergency Contact Number", content: tenant?.emergencyContactPhone, onContentPress: () => call({ number: tenant?.emergencyContactPhone }) },
          { label: "Address", content: tenant?.address },
        ]}
      >
        <Box py="3" px="3">
          {t(lease?.status === LEASE_STATUS.CURRENT,
            <>
              <Divider />
              <Box flexDirection="row" justifyContent="space-between">
                <Box flexDirection="row">
                  <Text category="label" py="3">
                    {tenant?.receivedReviews?.edgeCount ? `Rating` : 'No Ratings'}
                  </Text>
                  {t(tenant?.receivedReviews?.edgeCount,
                    <Text category="label" py="3" mx="1" color={theme['primary/50']}>
                      {`${tenant?.rank}%`}
                    </Text>)}
                </Box>
                {t(tenant?.receivedReviews?.edgeCount,
                  <Box as={TouchableOpacity} onPress={open}>
                    <Text py="3" color={theme['primary/50']}>
                      See all reviews
                    </Text>
                  </Box>)
                }
              </Box>
              {tenant?.receivedReviews?.edgeCount ? (
                <InfiniteCarousel
                  containerCustomStyle={{ alignSelf: 'center' }}
                  contentContainerCustomStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  itemWidth={dims.width * 0.85}
                  inactiveSlideOpacity={1}
                  sliderWidth={dims.width}
                  hasParallaxImages
                  useScrollView
                  autoplay
                  ref={carouselRef}
                  {...carouselProps}
                />
              ) : null}
            </>)}
          {(lease?.application?.pk && lease?.status === LEASE_STATUS.PROSPECTIVE) ? (
            <>
              <Box mt={0}>
                <Box
                  as={Button}
                  children={"Accept"}
                  onPress={() => applicationApprovalModalTypeState[1]('accept')}
                  {...button_styles["primary"]} />
                <Box as={Button}
                  my={2}
                  onPress={() => applicationApprovalModalTypeState[1]('deny')}
                  children={"Deny"}
                  {...button_styles["clear_red_border"]}
                />
              </Box>
              <ApplicationApproval
                applicationApprovalModalTypeState={applicationApprovalModalTypeState}
                applicationId={lease?.application?.pk}
                onSuccess={onUpdateStatusSuccess}
              />
            </>
          ) : null}
          <TenantProfileActions
            navigation={navigation}
            lease={lease}
            tenant={tenant}
            onRefresh={onRefresh}
            onSwitchToTab={props?.onSwitchToTab}
            {...route?.params?.params}
          />
          <Dialog
            visible={!!modal}
            onHide={() => setModal(null)}
            {...(modal || {})}
          />
        </Box>
        <TenantReviews
          isOpen={isOpen}
          close={close}
          lease={lease}
        />
      </FeaturesTab>

    </Box>
  );
};

export default TenantInfoTab;
