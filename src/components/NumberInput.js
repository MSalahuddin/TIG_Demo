import React from 'react';
import Button from 'components/Button';
import Box from './Box';
import Icon from './Icon';
import Text from './Text';

const NumberInput = ({value, onChange, min, max, step = 1, ...props}) => {
  const realValue = +value || 0;

  return (
    <Box flexDirection="row" alignItems="center" {...props}>
      <Button
        appearance="ghost"
        shape="circle"
        status="basic"
        size="large"
        icon={style =>
          Icon('minus-circle-outline')({
            ...style,
            style: {marginHorizontal: 4},
          })
        }
        style={{backgroundColor: 'transparent'}}
        disabled={realValue <= min}
        onPress={() => onChange?.(realValue - step)}
      />
      <Text
        category="label"
        transform="uppercase"
        fontSize={14}
        lineHeight={18}
        mx={2}>
        {realValue}
      </Text>
      <Button
        appearance="ghost"
        status="basic"
        shape="circle"
        size="large"
        disabled={realValue >= max}
        icon={style =>
          Icon('plus-circle-outline')({
            ...style,
            style: {marginHorizontal: 4},
          })
        }
        style={{backgroundColor: 'transparent'}}
        onPress={() => onChange?.(realValue + step)}
      />
    </Box>
  );
};

export default NumberInput;
