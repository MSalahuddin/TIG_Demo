import React from 'react';
import { Text } from 'react-native';
import Box from 'components/Box';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { TRANSACTION_TYPE } from 'constants/enums';
import { t } from 'helpers/react';
import { styles } from './styles';
import { colors } from "styles/theme";
import Features from 'components/Features';
import { format } from 'helpers/date';

const PAYMENT_METHODS_ICONS = {
  cash: 'transaction-details-cash',
  check: 'transaction-details-check',
  credit: 'transaction-details-credit-card',
  other: 'transaction-details-other',
  ['in app']: 'transaction-details-paypal',
};

const UserCashInfo = ({ date, amount, paymentMethod, transactionType, amountPaid, amountDue, isIncoming, displayFeatures, notice }) => {
  const iconName = PAYMENT_METHODS_ICONS[paymentMethod] || 'bank-account'
  if (displayFeatures) {
    return (
      <Features
        styles={{ row: styles.rentPaymentRow, content: styles.rentAndDebtItemPrice, label: styles.rentAndDebtItemText }}
        features={[
          { label: "Amount Due: ", content: `$${amount}`, icon: 'rent-payment-details', pack: "pm", styles: { iconContainer: styles.featuresIconContainer } },
          amountPaid > 0 && { label: "Amount Paid: ", content: `$${amountPaid}`, icon: 'rent-payment-details', icon: 'amount-paid', pack: "pm", styles: { iconContainer: { ...styles.featuresIconContainer, backgroundColor: colors["primary/5"] } } },
          { label: "Outstanding Debt: ", content: `$${amountDue}`, icon: 'outstanding-debt-details', pack: "pm", styles: { iconContainer: { ...styles.featuresIconContainer, backgroundColor: "#FFF1F1" } } },
          notice && { label: "Notice Sent", content: format(notice?.dateSent, 'dd MMM yyyy', null, { toDate: true }), iconProps: { height: 18, width: 18 }, icon: "notice", pack: "pm", styles: { iconContainer: styles.featuresIconContainer } }
        ]}
      />
    )
  }

  return (
    <Box mt={3} alignItems={"center"}>
      <Box style={styles.bankAccountLine} />
      <Box style={styles.bankAccountButtonContainer}>
        <Box style={[styles.bankAccountButton, { backgroundColor: transactionType === TRANSACTION_TYPE.INCOME ? colors['primary/50'] : colors['additional/out & expens'] }]}>
          <Box
            as={Button}
            icon={style => Icon(iconName, 'pm')({ ...style })}
            appearance="ghost"
            style={styles.bankAccountButtonIcon}
          />
          <Text style={styles.bankAccountButtonText}>
            {paymentMethod}
          </Text>
        </Box>
      </Box>
      <Text style={styles.dateText}>{format(date, 'dd MMM yyyy', null, { toDate: true })}</Text>
      <Text style={styles.amountText}>{t(!isIncoming, "-")}${amount}</Text>
    </Box>
  )
};

export default UserCashInfo;
