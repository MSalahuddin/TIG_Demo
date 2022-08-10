import React from 'react';
import Box from 'components/Box';
import FastImage from 'react-native-fast-image';
import Text from 'components/Text';
import UserCashInfo from '../UserCashInfo';
import { styles } from "../styles"
import { t } from 'helpers/react';

const TransactionDetailsHead = ({ amountDue, amountPaid, picture, name, date, amount, paymentMethod, isIncoming, isOutstanding, displayFeatures, notice }) => {
    return (
        <Box style={styles.profileContainer}>
            <Box style={styles.profileImageBox}>
                <FastImage source={{ uri: picture || "" }} resizeMode="cover" style={styles.profileImage} />
            </Box>
            <Text style={styles.profileName}>
                {t(!isOutstanding,
                    t(isIncoming, `From: `, `To: `)
                )}
                {name}
            </Text>
            <UserCashInfo
                isIncoming={isIncoming}
                date={date}
                amount={amount}
                paymentMethod={paymentMethod}
                amountDue={amountDue}
                amountPaid={amountPaid}
                displayFeatures={displayFeatures}
                notice={notice}
            />
        </Box>
    )
}

export default TransactionDetailsHead