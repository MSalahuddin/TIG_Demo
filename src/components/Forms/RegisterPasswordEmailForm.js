import React from "react"
import styled from 'styled-components/native';
import Form from 'components/Form';

import { Text, Input } from '@ui-kitten/components';

const OpacityInput = styled(Input)`
  opacity: 0.75;
`;

const RegisterPasswordEmailForm = ({setValue, onSubmit, errors, error}) => {
    return (

        <Form onSubmit={onSubmit}>
        {error ? (
          <Text category="c1" status="danger">
            {error}
          </Text>
        ) : null}
        <OpacityInput
          onChangeText={val => setValue('Email', val)}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCompleteType="email"
          textContentType="emailAddress"
          shape="rounded"
          status={errors.Email && 'danger'}
          caption={errors.Email && errors.Email.message}
          appearance="transparent"
          size="large"
        />
      </Form>
    
    )}

    export default RegisterPasswordEmailForm