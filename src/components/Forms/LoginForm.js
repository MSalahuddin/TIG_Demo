
import Form from "components/Form"
import React from "react"
import { Text, Input } from '@ui-kitten/components';


const LoginForm = ({ error, onSubmit, setValue, errors }) => {
    return (
        <Form onSubmit={onSubmit}>
            {error ? (
                <Text category="c1" status="danger">
                    {error}
                </Text>
            ) : null}

            <Input
                onChangeText={val => setValue('Email', val)}
                size="large"
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCompleteType="email"
                autoCapitalize="none"
                shape="rounded"
                status={errors.Email && 'danger'}
                caption={errors.Email && errors.Email.message}
            />
            <Input
                onChangeText={val => setValue('Password', val)}
                placeholder="Password"
                size="large"
                textContentType="password"
                secureTextEntry
                autoCompleteType="password"
                shape="rounded"
                appearance="transparent"
                status={errors.Password && 'danger'}
                caption={errors.Password && errors.Password.message}
            />
        </Form>
    )
}

export default LoginForm;