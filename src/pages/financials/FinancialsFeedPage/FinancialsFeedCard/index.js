import { useNavigation } from "@react-navigation/core";
import Box from "components/Box";
import React from "react";
import FastImage from 'react-native-fast-image';
import { styles } from "./styles";
import { Icon } from "@ui-kitten/components";
import { t } from "helpers/react";
import Text from "components/Text";
import { TouchableWithoutFeedback } from "react-native";
import { CASH_FLOW, OUTSTANDING_DEBTS, PAYMENT_METHOD_ICONS, PROFIT_AND_LOSS } from "pages/financials/const";
import SendNoticeModal from "pages/financials/TransactionDetails/NoticeActions/SendNoticeModal";
import { useIsOpen } from "hooks/useIsOpen";


const paymentMethodIcons = PAYMENT_METHOD_ICONS;
const now = new Date();
const FEED_TYPE_TO_AMOUNT_FIELD = {
    [OUTSTANDING_DEBTS]: "amountDue",
    [CASH_FLOW]: "amountPaid",
    [PROFIT_AND_LOSS]: "amount"
}
const FinancialsFeedCard = ({ payment, feedType, filterTab, isIncoming }) => {
    const { isOpen, open, close } = useIsOpen()
    const { due, building, unit, paymentMethod, payer, recipient } = payment
    const navigation = useNavigation();
    const photo = unit?.photos?.[0] || building?.photos?.[0];
    const paymentIcon = (paymentMethod && paymentMethodIcons[paymentMethod.toLowerCase()]) || "other";
    const fullName = payment?.isIncoming ? payer?.fullName : recipient?.fullName;
    const isOutstanding = feedType === OUTSTANDING_DEBTS;
    const amount = payment[FEED_TYPE_TO_AMOUNT_FIELD[feedType]] || payment?.amount;

    const imageSize = isOutstanding ? 36 : 48;
    return (
        <>
            <Box
                as={TouchableWithoutFeedback}
                onPress={() => navigation.navigate("TransactionDetails", { payment, feedType, filterTab })}
            >
                <Box {...styles.container}>
                    <Box mr={14} width={18} >
                        {t(paymentIcon, <Icon pack={"pm"} height={18} width={18} name={paymentIcon} />)}
                    </Box>
                    <FastImage style={{ height: imageSize, width: imageSize, borderRadius: 7 }} source={{ uri: photo }} />
                    <Box flex={3} {...styles.content}>
                        <Box   {...styles.buildingTextContainer}>
                            <Text numberOfLines={1}  {...styles.buildingText}>
                                {building?.address}
                            </Text>
                            {t(building && unit, <Text style={styles.slashSeparator}> / </Text>)}
                            <Text numberOfLines={1}  {...styles.buildingText}>
                                {unit?.unitNumber}
                            </Text>
                        </Box>
                        <Text numberOfLines={1}  {...styles.tenantText} >{fullName}</Text>
                    </Box>
                    <Box {...styles.amountContainer}>
                        {t(isOutstanding, <Text numberOfLines={1} {...styles.overdue}> {getDifferenceInDays(now, new Date(due))}d</Text>)}
                        <Text numberOfLines={1} {...styles.amountText} {...isOutstanding && styles.altAmountText} >${amount}</Text>
                    </Box>
                    {t(isOutstanding, (
                        <Box flex={0.5} as={TouchableWithoutFeedback} onPress={open} >
                            <Icon pack='pm' name='actions' height={24} width={24} />
                        </Box>
                    ))}
                </Box>
            </Box>
            {t(isOutstanding, <SendNoticeModal visible={isOpen} onHide={close} />)}
        </>
    )
};


const getDifferenceInDays = (dateOne, dateTwo) => {
    const timeDifference = dateOne.getTime() - dateTwo.getTime();
    const msPerDay = 1000 * 3600 * 24;
    const daysDifference = timeDifference / msPerDay;
    return Math.round(daysDifference)
}

export default FinancialsFeedCard