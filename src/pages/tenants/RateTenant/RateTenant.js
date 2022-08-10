import React from 'react';
import { KeyboardAvoidingView } from "react-native";
import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import Button from 'components/Button';
import SafeAreaView from 'components/SafeAreaView';
import { useQuery, useMutation } from 'urql';
import viewTenantLeaseQuery from 'queries/tenants/viewTenantLease.gql';
import reviewTenantMutation from 'queries/tenants/reviewTenant.gql';
import useTheme from 'hooks/useTheme';
import Text from 'components/Text';
import ThemedGradient from 'components/ThemedGradient';
import StepIndicator from 'react-native-step-indicator';
import useForm from 'react-hook-form';
import FocusedStatusBar from 'components/FocusedStatusBar';
import Dialog from 'components/Dialog';
import Avatar from 'components/Avatar';
import { schema, formatReviewFormDataToMutation, steps } from "./schema";
import { useLoader } from 'hooks/useLoader';
import { button_styles } from 'styles/button';
import { compact } from 'lodash';
import { HEIGHT_RATIO } from 'styles/responsive';

const RateTenant = ({ navigation, route }) => {
  const theme = useTheme();
  const [message, setMessage] = React.useState(null);
  const [title, setTitle] = React.useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    errors,
    unregister,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { step: 0 },
    validationSchema: schema,
  });

  const watching = watch([
    'step',
    'tenancyYears',
    'payRent',
    'paysOnTime',
    'lateFrequency',
    'isLateJustified',
    'isLateCommunicated',
    //step three
    'compliesToTerms',
    'followsBuildingRules',
    'subletsWithoutPermission',
    'notifiesUpgrades',
    "disposesGarbageAppropriately",
    'notifiesHonestly',
    'terminatedEarly',
    'terminatedEarlyWithViableCause',
    //step four
    'reportsIssuesProperly',
    'makesLegitimateRequests',
    "doesThreatenManagement",
    "givesSufficientTime",
    "replicatesComplaints",
    'providesAccess',
    "cooperatesWithInstructions",
    'contactsManagementExcessively',
    'difficultyRating',
    //step five
    'filesFormalComplaints',
    'contactsManagementFirst',
    'givesManagementSufficientTimeToFix',
    "historyOfFiling",
    'areComplaintsLegitimate',
    'complainProvidesAccess',
    //step six
    'damagesBuilding',
    'damagesUnit',
    'maintainsUnit',
    'exceededSecurityDeposit',
    //step seven
    'cooperates',
    'politenessRating',
    'isNoisy',
    'fightsWithTenants',
    'fightsWithStaff',
    'score',
    'comment'
  ]);

  React.useEffect(() => {
    Object.keys(schema.fields).forEach(name => register({ name }));
    return () => {
      Object.keys(schema.fields).forEach(name => unregister({ name }));
    };
  }, [register, unregister]);

  const [leaseRes, executeQuery] = useQuery({
    query: viewTenantLeaseQuery,
    variables: {
      id: route?.params?.id,
      tenantTab: false,
      unitTab: false,
      documentsTab: false,
      activityTab: false,
    },
    pause: !route?.params?.id,
  });

  const [rateTenantRes, rateTenant] = useMutation(reviewTenantMutation);

  const lease = leaseRes.data?.lease;
  const tenant = lease?.tenant;

  const StepComponent = steps[watching?.step]

  const stepStyles = React.useMemo(
    () => ({
      stepIndicatorSize: 10,
      currentStepIndicatorSize: 13,
      separatorStrokeWidth: 2,
      stepStrokeCurrentColor: theme['color-primary-500'],
      stepIndicatorCurrentColor: theme['color-primary-500'],
      stepStrokeUnFinishedColor: theme['grey-100'],
      stepIndicatorUnFinishedColor: theme['grey-100'],
      separatorUnFinishedColor: theme['grey-100'],
      stepStrokeFinishedColor: theme['color-primary-500'],
      stepIndicatorFinishedColor: theme['color-primary-500'],
      separatorFinishedColor: theme['color-primary-500'],
    }),
    [theme],
  );

  const submitting =
    rateTenantRes.fetching || isSubmitting;

  const onSubmit = React.useCallback(
    form => {
      setMessage(null);
      if (form.step < 7) {
        setValue('step', form.step + 1);
      } else {
        const submit = async () => {
          const { step: _, } = form;
          const review = formatReviewFormDataToMutation(form);
          const reviewRes = await rateTenant({
            id: tenant?.pk,
            data: review,
          });
          if (reviewRes.data?.reviewTenant?.success) {
            setTitle("submitted!")
            setMessage("Your rating has been submitted.")
            route?.params?.onUpdate?.();
          } else {
            setTitle("Failed to rate tenant.")
            setMessage(
              (reviewRes.error.message || '').replace(
                /\[(Network Error|GraphQL)\]\s*/g,
                '',
              ),
            );
          }
        };
        submit();
      }
    },
    [navigation, rateTenant, route, setValue, tenant],
  );

  const OnBtnPressed = () => {
    setMessage(null);
    navigation.goBack();
  }

  const { loader, } = useLoader({ isLoading: submitting })

  return (
    <Box as={Layout} flex={1}>
      <FocusedStatusBar barStyle="dark-content" animated />
      <Box as={SafeAreaView} flex={1} forceInset={{ top: 'always' }}>
        {loader}
        <Header
          actions={compact([
            {
              icon: watching.step === 0 ? 'close' : 'arrow-ios-back',
              onPress: () =>
                watching.step === 0
                  ? navigation.goBack()
                  : setValue('step', watching.step - 1),
              left: true,
            },
            route?.params?.onSkip && {
              text: "Skip",
              onPress: () => route?.params?.onSkip()
            },
          ])}
          title="RATE TENANT"
          divider
        />
        <Box alignItems="center" py="4">
          <Box
            as={ThemedGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            borderRadius={100}
            overflow="hidden"
            p="4px">
            <Box
              as={Avatar}
              source={
                tenant?.picture
                  ? { uri: tenant.picture }
                  : require('img/profile.svgpng')
              }
              height={HEIGHT_RATIO >= 1 ? 95 : 60}
              width={HEIGHT_RATIO >= 1 ? 95 : 60}
            />
          </Box>
          <Text mt={HEIGHT_RATIO >= 1 ? "3" : "2"} category="h3">{tenant?.fullName}</Text>
          <Box width={0.7} my={HEIGHT_RATIO >= 1 ? "3" : "2"}>
            <StepIndicator
              stepCount={7}
              currentPosition={watching.step}
              renderStepIndicator={() => null}
              customStyles={stepStyles}
            />
          </Box>
        </Box>

        <Box flex={1} as={KeyboardAvoidingView} behavior="padding">
          <StepComponent errors={errors} setValue={setValue} watching={watching} />
          <Box p="3" my={-2}>
            <Button
              children={watching.step === 7 ? 'Submit' : 'Next'}
              onPress={handleSubmit(onSubmit)}
              {...button_styles["primary"]}
            />
          </Box>
        </Box>
      </Box>
      <Dialog
        visible={!!message}
        title={title}
        closeIcon={false}
        content={message}
        buttons={[
          { children: 'OK', hide: true, shape: 'circle', gradient: true, onPress: OnBtnPressed, ...button_styles["primary"] },
        ]}
      />
    </Box>
  );
};

export default RateTenant;
