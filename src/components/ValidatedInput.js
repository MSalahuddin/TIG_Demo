import React from 'react';

import Input from './Input';
import { useFieldValidator } from 'hooks/useFieldValidator';
import Box from './Box';
import { Icon } from '@ui-kitten/components';
import { t } from 'helpers/react';
import Text from './Text';
import { typography } from 'styles/typography';

const ValidatedInput = ({ validators = [],  fieldName, onValidationChange, ...props }) => {
  const { error, handleValidation } = useFieldValidator(validators, { fieldName, onValidationChange })
  return (
    <Box width={"100%"}>
      <Input
        onEndEditing={handleValidation}
        {...props}
      />
      <Box height={18} alignItems={"center"} flexDirection={"row"} ml={1}>
        {t(error, <>
          <Icon name="error" pack="pm" height={12} width={12} />
          <Text style={typography["body/x-small – regular"]} ml={1} color={"red"}>{error}</Text>
        </>)}
      </Box>
    </Box>

  )
}

export default ValidatedInput;
