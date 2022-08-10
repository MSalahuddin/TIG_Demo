import React from 'react';

import styled from 'styled-components/native';
import { Text, Input } from '@ui-kitten/components';
import Form from 'components/Form';
const OpacityInput = styled(Input)`
  opacity: 0.75;
`;

const TwoFactorAuthCodeForm = ({ onSubmit, error, errors, setValue }) => {
  return (
    <Form onSubmit={onSubmit}>
      {error ? (
        <Text category="c1" status="danger">
          {error}
        </Text>
      ) : null}
      <OpacityInput
        onChangeText={val => setValue('Code', val)}
        placeholder="Verification Code"
        keyboardType="number-pad"
        autoCompleteType="off"
        shape="rounded"
        status={errors.Code && 'danger'}
        caption={errors.Code && errors.Code.message}
        autoFocus
        appearance="transparent"
        size="large"
      />
    </Form>
  );
};

export default TwoFactorAuthCodeForm;
