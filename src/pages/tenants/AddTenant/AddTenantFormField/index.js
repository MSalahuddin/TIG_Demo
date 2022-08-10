import React from 'react';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Input, { RequiredAsterisk } from 'components/Input';
import { format } from 'date-fns';
import { styles } from '../styles';
import DateField from 'components/Forms/Fields/DateField';
import useTheme from 'hooks/useTheme';
import TabListSelect from 'components/TabListSelect/TabListSelect';
import ProfileImageInput from 'components/ProfileImageInput';
import { CalendarViewModes } from '@ui-kitten/components';
import PhoneNumberInput from 'components/Forms/Fields/PhoneNumberInput';
import InputLabel from 'components/InputLabel';
import { input_label_16 } from 'styles/reusable-classes';
import ValidatedInput from 'components/ValidatedInput';
import { numericValidator } from 'helpers/validators';
import { usaDateFormat } from 'constants/dateFormat';

const dobMin = new Date(new Date().setFullYear(new Date().getFullYear() - 100));
const dobMax = new Date(new Date().setFullYear(new Date().getFullYear() - 15));
const tabListData = [{ text: "Driver licence", value: 'drivingLicense' }, { text: "Passport number", value: 'passport' }, { text: "SSN", value: 'ssn' }];
const AddTenantFormField = ({ watching, setValue, errors, submitting }) => {

    const theme = useTheme();

    return (
        <>
            <Box minHeight={108} flex={1} alignItems="center" justifyContent="center">
                <ProfileImageInput
                    isAvatar={true}
                    value={watching?.picture}
                    onChange={val => setValue('picture', val)}
                    disabled={submitting}
                />
            </Box>
            <Input
                label="First Name"
                mb={15}
                defaultValue={watching.firstName}
                status={errors.firstName && 'danger'}
                caption={errors.firstName && errors.firstName.message}
                onChangeText={val => setValue('firstName', val)}
                isRequired
            />
            <Input
                label={"Last Name"}
                mb={15}
                defaultValue={watching.lastName}
                status={errors.lastName && 'danger'}
                caption={errors.lastName && errors.lastName.message}
                onChangeText={val => setValue('lastName', val)}
                isRequired
            />
            <Input
                label="Email"
                mb={15}
                defaultValue={watching.email}
                keyboardType="email-address"
                autoCompleteType="email"
                status={errors.email && 'danger'}
                caption={errors.email?.message}
                onChangeText={val => setValue('email', val)}
                isRequired
            />
            <PhoneNumberInput
                label="Phone number (cell)"
                mb={15}
                defaultValue={watching.phoneNumberCell}
                status={errors.phoneNumberCell && 'danger'}
                caption={errors.phoneNumberCell && errors.phoneNumberCell.message}
                value={watching?.phoneNumberCell}
                onChangeText={val => setValue('phoneNumberCell', val)}
                isRequired
            />
            <PhoneNumberInput
                label="Phone number (work)"
                mb={15}
                defaultValue={watching.phoneNumberWork}
                status={errors.phoneNumberWork && 'danger'}
                caption={errors.phoneNumberWork && errors.phoneNumberWork.message}
                value={watching?.phoneNumberWork}
                onChangeText={val => setValue('phoneNumberWork', val)}
            />
            <Box mb={30}>
                <Text fontSize={14}>Date of birth <RequiredAsterisk /></Text>
                <DateField
                    onSelect={(d) => setValue("dataOfBirth", d)}
                    Component={Button}
                    value={watching?.dataOfBirth}
                    triggerKey={"onPress"}
                    max={dobMax}
                    min={dobMin}
                    date={dobMax}
                    startView={CalendarViewModes.YEAR}
                    boundingMonth={false}
                    inputProps={{
                        icon: Icon('calendar_black', "pm"),
                        appearance: "ghost",
                        children: watching?.dataOfBirth ? format(watching?.dataOfBirth, usaDateFormat) : "Select Date",
                        textStyle: styles.dateFieldText,
                        style: styles.dateField(theme),
                    }}
                />
            </Box>
            <Input
                label="Current address"
                mb={15}
                defaultValue={watching.currentAddress}
                status={errors.currentAddress && 'danger'}
                caption={errors.currentAddress && errors.currentAddress.message}
                onChangeText={val => setValue('currentAddress', val)}
                isRequired
            />
            <Input
                label="Reference name"
                mb={15}
                defaultValue={watching.currentReferenceName}
                status={errors.currentReferenceName && 'danger'}
                caption={errors.currentReferenceName && errors.currentReferenceName.message}
                onChangeText={val => setValue('currentReferenceName', val)}
                isRequired
            />
            <PhoneNumberInput
                label="Reference phone"
                mb={15}
                defaultValue={watching.currentReferencePhone}
                status={errors.currentReferencePhone && 'danger'}
                caption={errors.currentReferencePhone && errors.currentReferencePhone.message}
                value={watching?.currentReferencePhone}
                onChangeText={val => setValue('currentReferencePhone', val)}
                isRequired
            />
            <Divider />
            <Input
                label="Previous address"
                mb={15}
                defaultValue={watching.previousAddress}
                status={errors.previousAddress && 'danger'}
                caption={errors.previousAddress && errors.previousAddress.message}
                onChangeText={val => setValue('previousAddress', val)}
                isRequired
            />
            <Input
                label="Reference name"
                mb={15}
                defaultValue={watching.previousReferenceName}
                status={errors.previousReferenceName && 'danger'}
                caption={errors.previousReferenceName && errors.previousReferenceName.message}
                onChangeText={val => setValue('previousReferenceName', val)}
            />
            <PhoneNumberInput
                label="Reference phone"
                mb={15}
                defaultValue={watching.previousReferencePhone}
                status={errors.previousReferencePhone && 'danger'}
                value={watching?.previousReferencePhone}
                caption={errors.previousReferencePhone && errors.previousReferencePhone.message}
                onChangeText={val => setValue('previousReferencePhone', val)}
            />
            <Divider />
            <Box alignSelf='center' marginTop='5%' marginBottom="5%">
                <InputLabel label={"Document"} labelStyle={input_label_16} isRequired/>
                <TabListSelect
                    values={tabListData}
                    onPress={(item) => setValue('docType', item)}
                    currentSelectedItem={watching?.docType}
                    isRadio={true}
                    buttonWidth={'100%'}
                    flexDirection={'column'}
                />
            </Box>
            <ValidatedInput
                label="Enter number"
                mb={15}
                keyboardType="numeric"
                defaultValue={watching.docNumber}
                status={errors.docNumber && 'danger'}
                caption={errors.docNumber && errors.docNumber.message}
                onChangeText={val => setValue('docNumber', val)}
                validators={[numericValidator]}
                isRequired
            />
            <Divider />
            <Input
                label="Occupation"
                mb={15}
                defaultValue={watching.occupation}
                status={errors.occupation && 'danger'}
                caption={errors.occupation && errors.occupation.message}
                onChangeText={val => setValue('occupation', val)}
            />
            <Divider />
            <Input
                label="Emergency contact"
                mb={15}
                defaultValue={watching.emergencyContact}
                value={watching?.emergencyContact}
                status={errors.emergencyContact && 'danger'}
                caption={errors.emergencyContact && errors.emergencyContact.message}
                onChangeText={val => setValue('emergencyContact', val)}
            />
            <PhoneNumberInput
                label="Emergency contact phone"
                mb={15}
                defaultValue={watching.emergencyContactPhone}
                keyboardType="phone-pad"
                value={watching?.emergencyContactPhone}
                status={errors.emergencyContactPhone && 'danger'}
                caption={errors.emergencyContactPhone && errors.emergencyContactPhone.message}
                onChangeText={val => setValue('emergencyContactPhone', val)}
            />
        </>

    )
}


export default AddTenantFormField;