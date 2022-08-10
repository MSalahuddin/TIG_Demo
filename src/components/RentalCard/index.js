import React from 'react';
import styled from 'styled-components/native';
import { Icon } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import differenceInDays from 'date-fns/differenceInDays';

import { typography } from 'styles/typography';
import { format } from 'helpers/date';
import { usaDateFormat } from 'constants/dateFormat';
import { t } from 'helpers/react';
import TouchableText from '../TouchableText';
import LeasePaymentButton from './LeasePaymentButton';
import Text from 'components/Text';
import Box from 'components/Box';


const Shadow = styled(Box)`
  shadow-opacity: 0.15;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  elevation: 3;
  background-color: ${({ theme }) => theme['background-basic-color-1']};
`;

const Card = styled(Box)`
  background-color: ${({ theme }) => theme['background-basic-color-1']};
`;

const CardImage = styled(FastImage)`
  /* flex: 1; */
  height: 170;
`;

const CardHintIcon = styled(Icon).attrs(({ theme }) => ({
  tintColor: theme['grey-400'],
}))``;

const CardHintText = styled(Text)`
  color: ${({ theme }) => theme['grey-400']};
`;

const RentalCard = ({ image, price, due, onPay, pending, status, paidDate, onViewDetails, id, ...props }) => {
  const now = new Date();
  const diff = differenceInDays(due || now, now);
  const isPaid = status === "PAID"

  return (
    <Shadow mx={16} my="2" borderRadius={4} {...props}>
      <Card overflow="hidden" borderRadius={4}>
        <CardImage
          source={
            image ? { uri: image } : require('img/placeholder-building.jpeg')
          }
        />
        <Box mx={15} my={12}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb="4px">
            <Text style={typography["body/large – regular"]}>{diff < 0 ? 'Late ' : ''}Rent</Text>
            <Text style={typography["body/large – regular"]}>
              {(+price || 0).toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
          </Box>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <CardHintText category="c1">Due Date </CardHintText>
            {isPaid ? <CardHintText style={typography["body/small – medium"]}>{format(due, usaDateFormat)}</CardHintText> : (diff > 0 ? (
              <CardHintText category="c1">{diff} days</CardHintText>
            ) : (
              <Text category="c1" status="danger">
                {diff === 0 ? 'Today' : 'Overdue'}
              </Text>
            ))}

          </Box>
          {t(isPaid && paidDate, <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <CardHintText category="c1">Paid Date </CardHintText>
            <CardHintText style={typography["body/small – medium"]}>{format(paidDate, usaDateFormat, "", { toDate: true })}</CardHintText>
          </Box>)}
          <Box mt="3" mb="2" width={"100%"} alignSelf="center" alignItems={"center"}>
            <LeasePaymentButton status={status} paymentId={id} />
            <TouchableText style={{ ...typography["body/small – medium"],  marginTop: 3 }} onPress={onViewDetails}>View Details</TouchableText>
          </Box>
        </Box>
      </Card>
    </Shadow>
  );
};

export default RentalCard;
