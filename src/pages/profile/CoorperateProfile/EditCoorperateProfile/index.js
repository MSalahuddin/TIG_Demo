import React from 'react';
import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import useTheme from 'hooks/useTheme';
import { styles } from '../Personal/styles'
import { format } from 'date-fns';
import PhoneNumberInput from 'components/Forms/Fields/PhoneNumberInput';

import updateProfileMutation from 'queries/profile/updateUser.gql';
import { useQuery, useMutation } from 'urql';
import Input from 'components/Input';
import useForm from 'react-hook-form';
import getManagementCompanyEmployees from 'queries/properties/getManagementUsers.gql'
import DateField from 'components/Forms/Fields/DateField';
import { CalendarViewModes } from '@ui-kitten/components';
import { validateRequiredFields } from 'helpers/validators';

import Form from 'components/Form';
import SubmitButton from 'components/SubmitButton';
import AuthProvider from 'providers/auth';
import ProfileImageInput from 'components/ProfileImageInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ManagementTeamField from 'components/Forms/Fields/ManagementTeamField';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { useRegisterFields } from 'hooks/useRegisterFields';
import { schema, formatedInitialValues, formatUserFormDataToMutation } from './schema';
import FormError from 'components/Forms/FormError';
import { useLoader } from 'hooks/useLoader';
import WorkHoursField from 'components/Forms/Fields/DateTimeRange/WorkHoursField';
import InputLabel from 'components/InputLabel';
import { input_label_14 } from 'styles/reusable-classes';
import { getUserProfileQuery } from '../schema';
import { usaDateFormat } from 'constants/dateFormat';

const dobMin = new Date(new Date().setFullYear(new Date().getFullYear() - 100));
const dobMax = new Date(new Date().setFullYear(new Date().getFullYear() - 15));

const EditProfile = ({ navigation, userId, userType, route }) => {
  const { logout } = React.useContext(AuthProvider);
  const theme = useTheme();

  const [profileRes] = useQuery({
    query: getUserProfileQuery(userType),
    pause: !userId,
    variables: { id: userId },
    requestPolicy: "network-only"
  });
  const [error, setError] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(null);
  const [updateResult, onUpdate] = useMutation(updateProfileMutation);
  const initalValuesSet = React.useRef(false);
  const profile = profileRes?.data?.user;
  const initialValues = React.useMemo(() => formatedInitialValues(profile), [profile]);

  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'birthday',
    'workHours',
    'address'
  ];

  const [managementUserRes] = useQuery({ query: getManagementCompanyEmployees });
  const {
    watch,
    register,
    formState: { touched },
    setValue,
    handleSubmit,
    errors,
    unregister,
    getValues,
  } = useForm({
    validationSchema: schema,
    defaultValues: initialValues || {},
  });

  const watching = watch(['firstName', 'lastName', 'picture', 'birthday', 'phone', 'email', 'identificationNumber', 'workHours', 'officeEmail', "officeAddress", "officePhone", "address", "title"]);

  React.useEffect(() => {
    const values = getValues();
    if (initialValues && !initalValuesSet.current) {
      Object.keys(initialValues).forEach(
        k => !values[k] && !touched[k] && setValue(k, initialValues[k]),
      );
      initalValuesSet.current = true;
    }
  }, [getValues, initialValues, setValue, touched]);

  useRegisterFields(Object.keys(schema.fields), register, unregister)
  const { loader, } = useLoader({ isLoading: submitting || !profile })

  const onSubmit = React.useCallback(
    async _ => {
      let form = getValues();
      const isFilled = validateRequiredFields(form, requiredFields)
      if (!isFilled) return setError("Please fill all required fields.")
      setError(null);
      setSubmitting(true)
      const userData = formatUserFormDataToMutation(form);
      const res = await onUpdate({ userData: userData, id: profile.pk });
      const success = res.data?.updateUserProfile?.success
      setSubmitting(false)
      if (success) {
        navigation.goBack()
        route?.params?.onUpdate?.()
        return
      };
      setError("Failed to update profile, please ensure fields are filled correctly.")
    },
    [logout, navigation, onUpdate, profile],
  );

  return (
    <Box flex={1} as={Layout} pb={20}>
      <Box flex={1} as={SafeAreaView} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          title="Edit Profile"
          divider
        />
        {loader}
        <Box flex={1} alignItems="center">
          <Box mt={3} flex={1.5} alignItems="center" justifyContent="center">
            <ProfileImageInput
              value={watching?.picture}
              onChange={val => setValue('picture', val)}
              disabled={submitting}
            />
          </Box>
          <Box flex={5} width={0.85}>
            <Form loading={submitting} onSubmit={handleSubmit(onSubmit)}>
              <FormError mt={3} mx={0} my={0} error={error} />
              <KeyboardAwareScrollView enableResetScrollToCoords={false} >
                <Input
                  defaultValue={watching?.firstName}
                  label="first Name"
                  onChangeText={val => setValue('firstName', val)}
                  autoCompleteType="name"
                  status={errors.firstName && 'danger'}
                  caption={errors.firstName?.message}
                  mb={2}
                  isRequired
                  disabled
                />
                <Input
                  defaultValue={watching?.lastName}
                  label="last Name"
                  onChangeText={val => setValue('lastName', val)}
                  autoCompleteType="name"
                  status={errors.lastName && 'danger'}
                  caption={errors.lastName?.message}
                  mb={2}
                  isRequired
                  disabled
                />
                <PhoneNumberInput
                  label="Cell Phone"
                  mb={15}
                  defaultValue={watching?.phone}
                  status={errors.phone && 'danger'}
                  caption={errors.phone && errors.phone.message}
                  value={watching?.phone}
                  onChangeText={val => setValue('phone', val)}
                  isRequired
                />
                <Input
                  defaultValue={watching?.email}
                  label="Personal Email"
                  onChangeText={val => setValue('email', val)}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCompleteType="email"
                  status={errors.email && 'danger'}
                  caption={errors.email?.message}
                  disabled={submitting}
                  mb={2}
                  isRequired
                />
                <Input
                  defaultValue={watching?.title}
                  value={profile?.title}
                  label="Title"
                  autoCompleteType="name"
                  status={errors.title && 'danger'}
                  caption={errors.title?.message}
                  disabled={true}
                  mb={2}

                />
                <Input
                  defaultValue={watching?.identificationNumber}
                  label="ID"
                  onChangeText={val => setValue('identificationNumber', val)}
                  autoCompleteType="name"
                  status={errors.identificationNumber && 'danger'}
                  caption={errors.identificationNumber?.message}
                  mb={2}
                />
                <InputLabel labelStyle={input_label_14} label={"DOB"} isRequired />
                <DateField
                  onSelect={(d) => setValue("birthday", d)}
                  Component={Button}
                  value={watching?.birthday}
                  triggerKey={!watching?.birthday && "onPress"}
                  max={dobMax}
                  min={dobMin}
                  date={dobMax}
                  startView={CalendarViewModes.YEAR}
                  boundingMonth={false}
                  inputProps={{
                    icon: Icon('calendar_black', "pm"),
                    appearance: "ghost",
                    children: watching?.birthday ? format(watching?.birthday, usaDateFormat) : "Select Date",
                    textStyle: styles.dateFieldText,
                    style: styles.dateField(theme),
                  }}
                  isRequired
                />
                <Input
                  defaultValue={watching?.address}
                  label="Home Address"
                  onChangeText={val => setValue('address', val)}
                  autoCompleteType="name"
                  status={errors.address && 'danger'}
                  caption={errors.address?.message}
                  disabled={submitting}
                  mb={2}
                  isRequired
                />
                <Input
                  defaultValue={watching?.officeEmail}
                  label="Office Email"
                  onChangeText={val => setValue('officeEmail', val)}
                  textContentType="emailAddress"
                  autoCompleteType="name"
                  status={errors?.officeEmail && 'danger'}
                  caption={errors?.officeEmail?.message}
                  disabled={submitting}
                  mb={2}
                />
                <PhoneNumberInput
                  label="Office Phone"
                  mb={15}
                  defaultValue={watching?.officePhone}
                  status={errors?.officePhone && 'danger'}
                  caption={error?.officePhone && errors?.officePhone?.message}
                  value={watching?.officePhone}
                  onChangeText={val => setValue('officePhone', val)}
                />
                <Input
                  defaultValue={watching?.officeAddress}
                  label="Office Address"
                  onChangeText={val => setValue('officeAddress', val)}
                  autoCompleteType="name"
                  status={errors?.officeAddress && 'danger'}
                  caption={errors?.officeAddress?.message}
                  disabled={submitting}
                  mb={2}
                />
                <WorkHoursField
                  onSelect={(val) => setValue("workHours", val)}
                  value={watching?.workHours}
                  error={errors?.workHours?.message}
                  isRequired
                />
                <Box my={3}  />
                  <ManagementTeamField
                    textStyle={styles.fieldButtonText}
                    setValue={(val) => setValue('managementUser', val)}
                    value={managementUserRes?.data?.managementUsers?.edges?.map(({ node }) => node)}
                  />
              </KeyboardAwareScrollView>
            </Form>
          </Box>
          <Box width={0.85} mt={5}>
            <Box mb={4}>
              <SubmitButton
                loading={updateResult.fetching || submitting}
                onPress={handleSubmit(onSubmit)}
                disabled={!profile}>
                Save
              </SubmitButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
