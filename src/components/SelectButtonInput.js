import React from 'react';
import Box from './Box';
import Text from './Text';
import Button from 'components/Button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isString } from 'lodash';
import { t } from 'helpers/react';
import InputLabel from './InputLabel';
import { input_label_16 } from 'styles/reusable-classes';
import { typography } from 'styles/typography';
import { colors } from 'styles/theme';

const SelectButtonInput = ({
  value,
  label,
  addLabel,
  onAdd,
  icon = 'plus',
  labelCategory = 'label',
  renderValue,
  addLabelTransform = null,
  displayChange = true,
  buttonProps,
  LabelComponent = Text,
  styles,
  disabled,
  labelStyle,
  renderValueProps,
  changeBtnText = "Change",
  chooseBtnText = "Choose",
  isRequired,
  error,
  ...props
}) => {
  return (
    <Box width={"100%"} paddingTop='2.5%' paddingBottom='2.5%'>
      <Box width={"100%"} flexWrap='wrap' flexDirection='row'  {...props} >
        <Box
          width='50%'
          alignItems="center"
          alignSelf='center'
          py="10"
          flexDirection={"row"}
        >
          <InputLabel labelStyle={input_label_16} label={label} isRequired={isRequired} />
        </Box>
        {value ? (
          <>
            <Box
              as={!displayChange ? TouchableOpacity : Box}
              activeOpacity={0.8}
              onPress={onAdd}
              style={{ borderRadius: 4, overflow: "visible" }}
              width='50%'
              px={1}
              py="10">
              {onAdd && !disabled && displayChange ? (
                <Button
                  size="small"
                  style={{
                    borderRadius: 10,
                    borderWidth: 1.5,
                    borderColor: '#E8F2F1',
                    alignSelf: 'flex-end',
                    backgroundColor: '#E8F2F1'
                  }}
                  appearance="outline"
                  onPress={onAdd}
                  disabled={!onAdd || disabled}
                  {...buttonProps}
                  textStyle={{
                    color: '#24554E',
                    fontWeight: 'bold'
                  }}
                >
                  {changeBtnText}
                </Button>
              ) : null}
            </Box>
            {
              t(!!renderValue, renderValue?.(value, renderValueProps), isString(value) ? <Text style={input_label_16} >{value}</Text> : value)
            }
          </>
        ) : (
          <Box
            width='50%'
            height='100%'
            px={1}
            py="10"
          >
            <Button
              size="small"
              style={{
                borderColor: "#24554E",
                borderWidth: 1.5,
                borderRadius: 10,
                alignSelf: 'flex-end',
                backgroundColor: 'transparent'
              }}
              appearance="outline"
              onPress={onAdd}
              disabled={!onAdd || disabled}
              {...buttonProps}
              textStyle={{
                color: '#24554E',
                fontWeight: 'bold'
              }}
            >
              {chooseBtnText}
            </Button>
          </Box>
        )}
      </Box>
      {t(!!error, <Text mt={1} style={{ color: colors["additional/danger"], ...typography["body/x-small – regular"] }} >{error}</Text>)}
    </Box>

  );
};

export default SelectButtonInput;
