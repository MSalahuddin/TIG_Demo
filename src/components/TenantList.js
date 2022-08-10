import React, { useMemo } from 'react';
import Box from './Box';
import { Layout } from '@ui-kitten/components';
import DocumentPicker from 'react-native-document-picker';
import tenantsFeedQuery from 'queries/tenants/tenantsFeed.gql'
import createProspectiveTenantLeaseMutation from 'queries/tenants/createProspectiveTenantLease.gql';
import generateLeaseAgreementMutation from 'queries/tenants/generateLeaseAgreement.gql';
import InfiniteFlatList from './InfiniteFlatList';
import Text from './Text';
import SubmitButton from './SubmitButton';
import { LEASE_STATUS } from 'constants/enums';
import { useMutation } from 'urql';
import Persona from './Persona';
import { ReactNativeFile } from 'extract-files';
import Dialog from './Dialog';
import Icon from './Icon';
import Button from 'components/Button';
import BottomHalfContextMenu from 'components/ContextMenu/BottomHalfContextMenu';
import { colors } from 'styles/theme';
import ApplicationApproval from './ApplicationProcess/ApplicationApproval';
import { t } from 'helpers/react';
import { IS_SMALLER } from 'styles/responsive';

const TenantList = ({ navigation, route, building, queryParams, refreshOnFocus }) => {
  const { isProspective: isProspectiveTab } = queryParams;
  const listType = route?.params?.type ?? 1;
  const listRef = React.useRef();
  const [error, setError] = React.useState(null);
  const [modal, setModal] = React.useState(null);

  const [createLeaseRes, createProspectiveLease] = useMutation(
    createProspectiveTenantLeaseMutation,
  );
  const [genLeaseRes, generateLease] = useMutation(
    generateLeaseAgreementMutation,
  );

  const variables = React.useMemo(
    () => ({
      ...queryParams,
      buildingId: building?.pk,
    }),
    [building, listType, queryParams],
  );

  const leaseField = useMemo(() => getTenantLeaseField(queryParams), [queryParams])

  const { dataExtractor, keyExtractor } = React.useMemo(() => {
    return {
      dataExtractor: data => data.tenants,
      keyExtractor: data => data?.id,
    };
  }, []);

  const renderTenant = React.useCallback(
    ({ item: { id, pk, ...tenant } }) => {
      const lease = tenant[leaseField]
      const unit = lease?.unit;
      return lease && (
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb="1"
        >
          <Persona
            profile={tenant.picture}
            name={tenant.fullName}
            onPress={() => navigation.navigate('ViewTenant', { id: lease?.id, params: queryParams, refreshList: listRef.current?.refresh })}
            activeOpacity={0.7}
            styles={styles.tenantPersona}
            title={`Apartment ${unit?.unitNumber}`}
            avatarProps={{ shape: 'rounded', size: 'medium' }}
          >
            {
              t(isProspectiveTab, <Button
                onPress={() => setApplicationContextMenuStatus({ status: true, lease })}
                appearance="ghost"
                py="0px"
                px="0px"
                style={{ width: 30, height: 49, marginRight: 40 }}
                icon={style => Icon("humburger-menu", 'pm')({ width: 20, height: 20, })}
              ></Button>)
            }
          </Persona>
        </Box>
      );
    },
    [navigation, leaseField],
  );

  const onUploadApplication = React.useCallback(() => {
    const pickFile = async () => {
      let file;
      try {
        file = await DocumentPicker.pick({
          type: DocumentPicker.types.pdf,
        });
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('canceled');
        } else {
          console.log(err);
        }
      }
      if (!file) {
        return;
      }
      const res = await createProspectiveLease({
        application: new ReactNativeFile({
          uri: file.uri,
          type: file.type,
          name: file.name,
        }),
      });
      if (res.data?.createProspectiveTenantLease?.lease?.id) {
        listRef.current?.refresh?.();

        setModal({
          title: 'Application Uploaded',
          content: 'A prospective tenant profile has been created.',
          buttons: [
            {
              children: 'View Tenant',
              shape: 'circle',
              gradient: true,
              hide: true,
              onPress: () =>
                navigation.navigate('ViewTenant', {
                  id: res.data.createProspectiveTenantLease.lease.id,
                }),
            },
          ],
        });
      } else {
        setError({
          title: 'Failed to submit application.',
          content: (res.error.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        });
      }
    };
    pickFile();
  }, [createProspectiveLease, navigation]);

  let leasePayload = React.useRef(null)
  const [applicationApprovalModalType, setApplicationApprovalModalType] = React.useState('');
  const contextMenuItems = [
    {
      key: "accept", label: "Accept", color: colors["primary/50"], icon: 'green-tick', onPress: () => setApplicationApprovalModalType("accept")
    },
    {
      key: "deny", label: "Deny", color: colors["additional/danger"], icon: 'red-dustbin', onPress: () => setApplicationApprovalModalType("deny")
    }
  ];

  const [showApplicationContextMenu, setShowApplicationContextMenu] = React.useState(false);

  const setApplicationContextMenuStatus = ({ status, lease }) => {
    setShowApplicationContextMenu(status)
    if (typeof lease === 'object') //object or null
      leasePayload.current = lease
  }
  return (
    <Box as={Layout} flex={1}>
      <Box pb="3" flex={1}>
        <Box flex={1}>
          <InfiniteFlatList
            ref={listRef}
            query={tenantsFeedQuery}
            variables={variables}
            dataExtractor={dataExtractor}
            keyExtractor={keyExtractor}
            refreshOnFocus={refreshOnFocus}
            renderItem={renderTenant}
            contentContainerStyle={{ paddingBottom: 50, paddingTop: 4 }}
            ListEmptyComponent={
              <Text category="h6" py={3} textAlign="center" appearance="hint">
                No Tenants
              </Text>
            }
          />
        </Box>
        {listType === LEASE_STATUS.PROSPECTIVE ? (
          <Box width={0.9} alignSelf="center" py="3">
            <SubmitButton
              gradient
              shape="circle"
              size="giant"
              onPress={onUploadApplication}
              loading={createLeaseRes.fetching || genLeaseRes.fetching}>
              Upload Application
            </SubmitButton>
          </Box>
        ) : null}
      </Box>
      <Dialog
        visible={!!modal}
        onHide={() => setModal(null)}
        {...(modal || {})}
      />
      <Dialog
        visible={!!error}
        onHide={() => setError(null)}
        title={error?.title}
        content={error?.content}
        buttons={[
          { children: 'OK', gradient: true, shape: 'circle', hide: true },
        ]}
      />
      {t(isProspectiveTab,
        <>
          <BottomHalfContextMenu
            menuItems={contextMenuItems}
            visible={showApplicationContextMenu}
            onHide={() => setApplicationContextMenuStatus({ status: false })}
            title="Prospective Tenant"
          />
          <ApplicationApproval
            applicationApprovalModalTypeState={[applicationApprovalModalType, setApplicationApprovalModalType]}
            applicationId={leasePayload?.current?.application?.pk}
            onSuccess={() => listRef.current?.refresh?.()}
            onHide={() => setApplicationContextMenuStatus({ status: false, lease: null })}
          />
        </>
      )
      }
    </Box>
  );
};

const getTenantLeaseField = (variables) => {
  const { isApproved, isCurrent, isProspective, isPast } = variables;
  if (isApproved) return "approvedLease";
  if (isCurrent) return "currentLease";
  if (isProspective) return "prospectiveLease";
  if (isPast) return "pastLease";
}

const styles = {
  tenantPersona: {
    text: { minWidth: IS_SMALLER ? "40%" : '50%', maxWidth: IS_SMALLER ? "40%" : '55%' }
  }
}

export default TenantList;
