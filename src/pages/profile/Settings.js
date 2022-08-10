import React from 'react';
import SafeAreaView from 'components/SafeAreaView';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import Text from 'components/Text';
import {ScrollView} from 'react-native-gesture-handler';
import DocumentItem from 'components/DocumentItem';

import styled from 'styled-components/native';
import useTheme from 'hooks/useTheme';
import {TouchableOpacity} from 'react-native';

const ShadowBox = styled(Box)`
  shadow-opacity: 0.1;
  shadow-radius: 8;
  shadow-color: #000;
  elevation: 5;
  background-color: ${({theme}) => theme['background-basic-color-1']};
`;

export default function Settings({navigation}) {
  return (
    <Box flex={1} as={Layout} pb={20}>
      <Box flex={1} as={SafeAreaView} forceInset={{top: 'always'}}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          title="Settings"
          divider
        />
        <Box as={ScrollView} alwaysBounceVertical={false}>
          <Box py="3" px="4">
            {React.useMemo(
              () => [
                // {
                //   name: 'Payment Methods',
                // },
                {
                  name: 'Payment History',
                  route: 'PaymentHistory',
                },
                {
                  name: 'Emergency Contact',
                  route: 'EditEmergency',
                },
                {
                  name: 'Privacy Policy',
                  route: 'PrivacyPolicy',
                },
                {
                  name: 'Terms of Use',
                  route: 'TermsOfUse',
                },
              ],
              [],
            ).map(btn => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={
                  btn.route ? () => navigation.navigate(btn.route) : null
                }
                key={btn.name}>
                <ShadowBox
                  my="2"
                  flexDirection="row"
                  alignItems="center"
                  py="10"
                  borderRadius={3}
                  height={55}>
                  <Text category="s2" flex={1} px="3" numberOfLines={1}>
                    {btn.name}
                  </Text>
                </ShadowBox>
              </TouchableOpacity>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
