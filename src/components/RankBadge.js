import React from 'react';
import Box from './Box';
import {ImageBackground} from 'react-native';
import Text from './Text';
import useTheme from 'hooks/useTheme';
import {Icon} from '@ui-kitten/components';

const RankBadge = ({rank, ...props}) => {
  const theme = useTheme();
  return (
    <Box
      as={ImageBackground}
      alignItems="center"
      alignSelf="flex-end"
      justifyContent="space-around"
      width={40}
      height={50}
      source={require('img/rank-bg.svgpng')}
      py={1}
      {...props}>
      <Icon
        name="star"
        tintColor={theme['color-primary-500']}
        width={15}
        height={15}
      />
      <Text status="control">{Math.round(+rank * 10) / 10}</Text>
    </Box>
  );
};

export default RankBadge;
