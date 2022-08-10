import React from 'react';
import styled from 'styled-components/native';
import { Icon, Input as InputUI } from '@ui-kitten/components';
import { space, flexbox } from 'styled-system';
import { colors } from 'styles/theme';
import Box from './Box';
import Text from './Text';
import { input_label_14 } from 'styles/reusable-classes';
import InputLabel from './InputLabel';
import { t } from 'helpers/react';

export const RequiredAsterisk = ({ ...props }) => <Text fontSize={12} pb={1} color={colors["additional/danger"]} {...props}> * </Text>
const _Input = styled(InputUI).attrs(({ theme, label, status, captionTextStyle, labelStyle = input_label_14, textStyle = { color: colors['gray scale/90'] } }) => ({
  labelStyle,
  captionTextStyle:
    (status ?? 'basic') === 'basic'
      ? {
        color: '#979797',
        ...(captionTextStyle ?? {}),
      }
      : captionTextStyle,
  selectionColor: theme['color-primary-500'],
  textStyle,
  label
}))(space, flexbox);

_Input.styledComponentName = 'Input';

const Input = ({ label, labelStyle = input_label_14, isRequired, containerProps, error, ...props }) => {
  return (
    <Box width={"100%"} {...containerProps}>
      {t(label, <InputLabel label={label} isRequired={isRequired} labelStyle={labelStyle} />)}
      <_Input {...props} />
    </Box>
  )
}

export default Input;
