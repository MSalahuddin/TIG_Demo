import React from 'react';
import styled from 'styled-components/native';
import call from 'react-native-phone-call';
import Box from './Box';
import Button from 'components/Button';
import EasyIcon from './Icon';
import Persona from './Persona';
import {Linking} from 'react-native';
import RankBadge from './RankBadge';

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

const CardButton = styled(Button)`
  background-color: transparent;
  margin-left: 16px;
  padding-horizontal: 3px;
  border-color: ${({theme}) => theme['grey-100']};
`;

const ServiceProviderCard = ({
  fullName,
  image,
  title,
  rank,
  phone,
  email,
  ...props
}) => {
  return (
    <Shadow mx={10} my={10} borderRadius={4} {...props}>
      <Card overflow="hidden" borderRadius={4} flexDirection="row">
        <Persona
          pl={26}
          profile={image}
          name={fullName}
          title={title}
          flex={1}
        />
        <Box pr={20}>
          {rank ? (
            <RankBadge rank={rank} mr={1} />
          ) : (
            <Box width={40} height={50} mr={1} />
          )}
          <Box flexDirection="row" my={12}>
            <CardButton
              activeOpacity={0.6}
              icon={EasyIcon('phone')}
              appearance="outline"
              shape="circle"
              onPress={() => call({number: phone})}
            />
            <CardButton
              activeOpacity={0.6}
              icon={EasyIcon('email')}
              appearance="outline"
              shape="circle"
              onPress={() => Linking.openURL(`mailto:${email}`)}
            />
          </Box>
        </Box>
      </Card>
    </Shadow>
  );
};

export default ServiceProviderCard;
