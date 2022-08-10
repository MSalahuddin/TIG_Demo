import React from 'react';
import styled from 'styled-components/native';
import Box from './Box';
import Text from './Text';
import useTheme from 'hooks/useTheme';
import {RENT_TYPES, UNIT_STATUS} from 'constants/enums';
import UnitStatusBadge from './UnitStatusBadge';
import FastImage from 'react-native-fast-image';

const Shadow = styled(Box)`
  shadow-opacity: 0.15;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  background-color: ${({theme}) => theme['background-basic-color-1']}
  elevation: 3;
`;

const Card = styled(Box)`
  background-color: ${({theme}) => theme['background-basic-color-1']};
`;

const CardImage = styled(FastImage)`
  /* flex: 1; */
  height: 120;
`;

const CardHintText = styled(Text)`
  margin-left: 4;
  text-transform: uppercase;
  color: ${({theme}) => theme['grey-400']};
`;

const UnitCard = ({unitNumber, status, image, rentType, price}) => {
  const theme = useTheme();

  return (
    <Shadow borderRadius={4}>
      <Card overflow="hidden" borderRadius={4} position="relative">
        <CardImage
          source={
            image ? {uri: image} : require('img/placeholder-building.jpeg')
          }
        />
        <UnitStatusBadge
          status={status}
          position="absolute"
          top={108}
          width="50%"
          left="25%"
        />
        <Box mx="8px" mb="8px" mt={16}>
          <Text
            category="h2"
            mb="4px"
            color={theme['color-secondary2-default']}>
            {`Apartment ${unitNumber}`.toUpperCase()}
          </Text>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <CardHintText
              category="c2"
              fontSize={12}
              appearance="hint"
              maxWidth="70%"
              numberOfLines={1}>
              {Object.keys(RENT_TYPES)
                .filter(k => RENT_TYPES[k] === rentType)
                .map(k =>
                  k
                    .split('_')
                    .map(w => w.toUpperCase())
                    .join(' '),
                )}
            </CardHintText>
            <CardHintText category="c1" color={theme['grey-700']}>
              ${price.toLocaleString()}
            </CardHintText>
          </Box>
        </Box>
      </Card>
    </Shadow>
  );
};

export default UnitCard;
