import React from 'react';
import Box from './Box';
import Text from './Text';
import Button from 'components/Button';

const YesNoInput = ({label, value, onChange, error, labelStyle, buttonStyle, ...props}) => {
  const [currValue, setCurrValue] = React.useState(value);

  const onChangeProxy = React.useCallback(
    val => {
      setCurrValue(val);
      onChange?.(val);
    },
    [onChange],
  );

  return (
    <Box mb="4" {...props}>
      <Text style={labelStyle} category="label">{label}</Text>
      <Box flexDirection="row" pt="3">
        <Button
          shape="circle"
          appearance={currValue === 1 ? 'filled' : 'outline'}
          onPress={() => onChangeProxy(1)}
          size="small"
          style={[{
            flex: 1,
            ...(currValue !== 1 ? {backgroundColor: 'transparent'} : {}),
          }, buttonStyle]}>
          YES
        </Button>
        <Box mx="2" />
        <Button
          shape="circle"
          appearance={currValue === 2 ? 'filled' : 'outline'}
          onPress={() => onChangeProxy(2)}
          size="small"
          style={[{
            flex: 1,
            ...(currValue !== 2 ? {backgroundColor: 'transparent'} : {}),
          }, buttonStyle]}>
          NO
        </Button>
        <Box mx="2" />
        <Button
          shape="circle"
          appearance={currValue === 3 ? 'filled' : 'outline'}
          onPress={() => onChangeProxy(3)}
          size="small"
          style={[{
            flex: 1,
            ...(currValue !== 3 ? {backgroundColor: 'transparent'} : {}),
          }, buttonStyle]}>
          N/A
        </Button>
      </Box>
      {error && (
        <Text category="c1" status="danger" my="2">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default YesNoInput;
