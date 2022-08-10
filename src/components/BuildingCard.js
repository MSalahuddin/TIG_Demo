import React from 'react';
import styled from 'styled-components/native';
import Box from './Box';
import {Icon} from '@ui-kitten/components';
import Text from './Text';
import FastImage from 'react-native-fast-image';
import useTheme from 'hooks/useTheme';

const Shadow = styled(Box)`
  shadow-opacity: 0.15;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  elevation: 3;
  background-color: ${({theme}) => theme['background-basic-color-1']};
`;

const Card = styled(Box)`
  background-color: ${({theme}) => theme['background-basic-color-1']};
`;

const CardImage = styled(FastImage)`
  /* flex: 1; */
  height: 170;
`;

const CardHintIcon = styled(Icon).attrs(({theme}) => ({
  tintColor: theme['grey-400'],
}))``;

const CardHintText = styled(Text)`
  margin-left: 4;
  text-transform: uppercase;
  color: ${({theme}) => theme['grey-400']};
`;

const BuildingCard = ({name, image, location, vacantCount, ...props}) => {
  const theme = useTheme();
  return (
    <Shadow mx={10} my="5px" borderRadius={4} {...props}>
      <Card overflow="hidden" borderRadius={4}>
        <CardImage
          source={
            image ? {uri: image} : require('img/placeholder-building.jpeg')
          }
        />
        <Box mx={15} my={12}>
          <Text
            category="s1"
            mb="4px"
            color={theme['color-secondary2-default']}>
            {`${name}`.toUpperCase()}
          </Text>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Box maxWidth={"50%"} flexDirection="row" alignItems="center">
              <CardHintIcon name="location" pack="pm" width={15} height={15} />
              <CardHintText numberOfLines={1} category="c2" appearance="hint" ml={1}>
                {location}
              </CardHintText>
            </Box>
            <Box maxWidth={"50%"} flexDirection="row" alignItems="center" ml={2}>
              <CardHintIcon name="unit" pack="pm" width={15} height={15} />
              <CardHintText numberOfLines={1}  category="c2" appearance="hint" ml={1}>
                Vacant Units: {vacantCount}
              </CardHintText>
            </Box>
          </Box>
        </Box>
      </Card>
    </Shadow>
  );
};

export default BuildingCard;
