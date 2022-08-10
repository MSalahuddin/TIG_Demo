import React from 'react';
import Slider from '@react-native-community/slider';
import useTheme from 'hooks/useTheme';
import Box from './Box';
import Text from './Text';
import { Platform } from 'react-native';
import { colors } from "styles/theme";

const SliderInput = ({ min, max, value = min, onChange, label, labelStyle, ...props }) => {
  const theme = useTheme();
  const [currValue, setCurrValue] = React.useState(value);

  const onChangeProxy = React.useCallback(
    val => {
      onChange?.(val);
      setCurrValue(val);
    },
    [onChange],
  );

  return (
    <Box py="2" {...props}>
      <Text style={labelStyle} category="label">{label}</Text>
      <Box flexDirection="row" alignItems="center">
        <Box mt="3">
          <Text color={colors['primary/50']}>
            {min}
          </Text>
        </Box>
        <Box flex={1} mt="3">
          <Slider
            minimumValue={min}
            maximumValue={max}
            // Have as uncontrolled to prevent lag.
            // value={value}
            onValueChange={onChangeProxy}
            minimumTrackTintColor={colors['primary/50']}
            maximumTrackTintColor={colors['gray scale/40']}
            thumbTintColor={
              Platform.OS === 'android' ? colors['primary/50'] : null
            }
          />
        
        </Box>
        <Box mt="3">
          <Text color={colors['primary/50']}>
            {max}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SliderInput;
