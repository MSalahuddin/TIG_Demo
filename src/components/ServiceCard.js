import React from 'react';
import styled from 'styled-components/native';
import Box from './Box';
import {Icon} from '@ui-kitten/components';
import Text from './Text';
import FastImage from 'react-native-fast-image';
import ThemedGradient from './ThemedGradient';
import useTheme from 'hooks/useTheme';

const Shadow = styled(Box)`
  shadow-opacity: 0.15;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  elevation: 5;
  background-color: ${({theme}) => theme['background-basic-color-1']};
  
`;

const Card = styled(Box)`
  background-color: ${({theme}) => theme['background-basic-color-1']};
`;

const CardImage = styled(FastImage)`
  /* flex: 1; */
  height: 110;
`;

const CardHintIcon = styled(Icon).attrs(({theme}) => ({
  fill: theme['grey-400'],
}))``;

const CardHintText = styled(Text)`
  margin-left: 4;
  text-transform: uppercase;
  color: ${({theme}) => theme['grey-400']};
`;

const ServiceCard = ({name, image, numProviders, minimal, ...props}) => {
  const theme = useTheme();
  return (
    <Shadow mx={10} my="5px" borderRadius={4} {...props}>
      <Card overflow="hidden" borderRadius={4}>
        <Box>
          <CardImage
            source={
              image ? {uri: image} : require('img/placeholder-building.jpeg')
            }
          />

          <Box
            as={ThemedGradient}
            flex={1}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0.25, 0.61, 1]}
            left={0}
            top={0}
            width="100%"
            height="100%"
            opacity={0.5}
            colors={[
              theme['color-primary-default'],
              theme['color-primary3-transparent-500'],
              theme['color-primary2-transparent-600'],
            ]}
            position="absolute"
          />
        </Box>
        <Box
          flexDirection="row"
          mx={15}
          my={12}
          alignItems="center"
          justifyContent="space-between"
          height={minimal ? 24 : 36}>
          <Text category={minimal ? 'p1' : 's1'} mb="4px">
            {name}
          </Text>
          {!minimal && numProviders !== null && numProviders >= 0 ? (
            <CardHintText category="c2" appearance="hint" ml={1}>
              {numProviders} Providers
            </CardHintText>
          ) : null}
        </Box>
      </Card>
    </Shadow>
  );
};

export default ServiceCard;
