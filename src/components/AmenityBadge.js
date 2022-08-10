import React from 'react';
import Box from './Box';
import useTheme from 'hooks/useTheme';
import {Layout} from '@ui-kitten/components';
import Text from './Text';
import styled from 'styled-components/native';

const BadgeText = styled(Text)`
  color: ${({theme}) => theme['grey-300']};
  font-size: 10;
  text-transform: uppercase;
  text-align: center;
`;

const AmenityBadge = ({amenity, ...props}) => {
  const theme = useTheme();

  return (
    <Box
      as={Layout}
      p="2"
      py="1"
      mr="2"
      mb="2"
      borderColor={theme['grey-300']}
      borderWidth={1}
      borderRadius={6}
      {...props}>
      <BadgeText category="c1">{amenity}</BadgeText>
    </Box>
  );
};

export default AmenityBadge;
