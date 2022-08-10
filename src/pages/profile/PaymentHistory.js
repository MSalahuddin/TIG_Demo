import React from 'react';
import SafeAreaView from 'components/SafeAreaView';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import Text from 'components/Text';
import listPaymentHistoryQuery from 'queries/profile/listPaymentHistory.gql';

import styled from 'styled-components/native';
import InfiniteFlatList from 'components/InfiniteFlatList';
import format from 'date-fns/format';
import { dateFormatMonthYrs, usaDateFormat } from 'constants/dateFormat';
import {
  stringifyEnumValue,
  PAYMENT_METHODS,
} from 'constants/enums';

const ShadowBox = styled(Box)`
  shadow-opacity: 0.1;
  shadow-radius: 8;
  shadow-color: #000;
  elevation: 5;
  background-color: ${({theme}) => theme['background-basic-color-1']};
`;

const dateSections = [];
const now = new Date();
for (let i = now.getFullYear(); i > now.getFullYear() - 10; i--) {
  for (let m = 0; m < 13; m++) {
    const d = new Date(i, m);
    dateSections.push(format(d, dateFormatMonthYrs));
  }
}

export default function PaymentHistory({navigation}) {
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
          title="Payment History"
          divider
        />
        <Box
          as={InfiniteFlatList}
          query={listPaymentHistoryQuery}
          {...React.useMemo(
            () => ({
              keyExtractor: item => item.id,
              dataExtractor: data => data.payments,
              sections: dateSections,
              sectionExtractor: item =>
                format(new Date(item.paidAt), dateFormatMonthYrs),
              renderSectionHeader: ({section}) => (
                <Box as={Layout} pt="3" pb="2" mb="1" px="3">
                  <Text category="s2" mx="3" transform="uppercase">
                    {section.title}
                  </Text>
                </Box>
              ),
              renderItem: ({item}) => (
                <ShadowBox my="2" mx="3" p="3">
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Text category="s1">{item.transaction.name}</Text>
                    <Text category="c1">
                      {item.amount.toLocaleString(undefined, {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </Text>
                  </Box>
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Text appearance="hint" category="c2">
                      {format(new Date(item.paidAt), usaDateFormat)}
                    </Text>
                    <Text appearance="hint" category="c2">
                      {stringifyEnumValue(
                        PAYMENT_METHODS,
                        +item.transaction.paymentForm,
                      )}
                    </Text>
                  </Box>
                </ShadowBox>
              ),
              ListEmptyComponent: (
                <Text category="h6" py={3} textAlign="center" appearance="hint">
                  No Previous Payments
                </Text>
              ),
            }),
            [],
          )}
        />
      </Box>
    </Box>
  );
}
