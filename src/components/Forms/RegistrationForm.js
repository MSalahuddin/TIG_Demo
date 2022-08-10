import React, { useMemo, useState } from 'react';
import Form from 'components/Form';
import { Text, Input } from '@ui-kitten/components';
import styled from 'styled-components/native';
import MultiTextSwitch from 'components/MultiTextSwitch';
import { stringifyEnumValue, USER_TYPES } from 'constants/enums';
import PhoneNumberInput from './Fields/PhoneNumberInput';
import { IS_SMALLER } from 'styles/responsive';

const getUserTypes = () => {
    let userTypes = { ...USER_TYPES };
    delete userTypes["STAFF"];
    delete userTypes['TENANT'];
    delete userTypes['MANAGEMENT'];
    userTypes['MANAGER'] = 3
    return userTypes
}

const OpacityInput = styled(Input)`
  opacity: 0.75;
  flex: ${({ row }) => (row ? 1 : 0)};
`;

const Space = styled.View`
  margin-horizontal: 5;
`;

const Row = styled.View`
  flex-direction: row;
`;
const OpacityPhoneInput = styled(PhoneNumberInput)`
  opacity: 0.75;
  flex: ${({ row }) => (row ? 1 : 0)};
`;

const style = {
    switch: IS_SMALLER ? { marginTop: 1, marginBottom: 10 } : { marginTop: 10, marginBottom: 20, }
}

const RegistrationForm = ({ onSubmit, error, setValue, errors }) => {
    const [userType, setUserType] = useState(null)
    const userTypes = useMemo(() => getUserTypes(), [])

    const handleSwitch = (option) => {
        setValue('userType', option.value);
        setUserType(option.value)
    }

    return (
        <Form onSubmit={onSubmit(onSubmit)}>
            {error ? (
                <Text category="c1" status="danger">
                    {error}
                </Text>
            ) : null}
            <MultiTextSwitch
                shape="circle"
                size="small"
                options={Object.values(userTypes).map(value => ({
                    text: stringifyEnumValue(userTypes, value),
                    value,
                }))}
                style={style.switch}
                onSelect={(option) => handleSwitch(option)}
            />
            <Row>
                <OpacityInput
                    row
                    onChangeText={val => setValue('firstName', val)}
                    placeholder="First Name"
                    textContentType="name"
                    autoCompleteType="name"
                    returnKeyType="next"
                    shape="rounded"
                    status={errors['firstName'] && 'danger'}
                    caption={errors['firstName'] && errors['firstName'].message}
                    size={!IS_SMALLER && "large"}
                    appearance="transparent"
                />
                <Space />
                <OpacityInput
                    row
                    onChangeText={val => setValue('lastName', val)}
                    placeholder="Last Name"
                    textContentType="nameSuffix"
                    autoCompleteType="name"
                    shape="rounded"
                    status={errors['lastName'] && 'danger'}
                    caption={errors['lastName'] && errors['lastName'].message}
                    size={!IS_SMALLER && "large"}
                    appearance="transparent"
                />
            </Row>
            <OpacityInput
                onChangeText={val => setValue('email', val)}
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCompleteType="email"
                shape="rounded"
                status={errors.email && 'danger'}
                caption={errors.email && errors.email.message}
                size={!IS_SMALLER && "large"}
                appearance="transparent"
            />
            <OpacityPhoneInput
                onChangeText={val => setValue('phone', val)}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                autoCompleteType="tel"
                shape="rounded"
                status={errors['phone'] && 'danger'}
                caption={errors['phone'] && errors['phone'].message}
                size={!IS_SMALLER && "large"}
                appearance="transparent"
            />
            {
                userType && (userType === USER_TYPES.MANAGEMENT) && (
                    <OpacityInput
                        row
                        onChangeText={val => setValue('companyName', val)}
                        placeholder="Company Name"
                        textContentType="name"
                        autoCompleteType="name"
                        returnKeyType="next"
                        shape="rounded"
                        status={errors['companyName'] && 'danger'}
                        caption={errors['companyName'] && errors['companyName'].message}
                        size={!IS_SMALLER && "large"}
                        appearance="transparent"
                    />
                )
            }
        </Form>
    )
}


export default RegistrationForm;