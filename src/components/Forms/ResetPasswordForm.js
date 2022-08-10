import React from 'react';

import Form from 'components/Form';

import styled from 'styled-components/native';
import {Input, Text} from '@ui-kitten/components';
const OpacityInput = styled(Input)`
opacity: 0.75;
`;


const ResetPasswordForm = ({onSubmit, errors, error, setValue}) => {

    return (

        <Form onSubmit={onSubmit}>
          {error ? (
            <Text category="c1" status="danger">
              {error}
            </Text>
          ) : null}
          <OpacityInput
            onChangeText={val => setValue('Password', val)}
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            autoCompleteType="password"
            shape="rounded"
            status={errors.Password && 'danger'}
            caption={errors.Password && errors.Password.message}
            autoFocus
            appearance="transparent"
            size="large"
          />
          <OpacityInput
            onChangeText={val => setValue('Confirm', val)}
            placeholder="Confirm Password"
            textContentType="password"
            secureTextEntry
            autoCompleteType="password"
            shape="rounded"
            status={errors.Confirm && 'danger'}
            caption={errors.Confirm && errors.Confirm.message}
            appearance="transparent"
            size="large"
          />
        </Form>
    )

}


export default ResetPasswordForm