import React from "react";

import { View, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { colors } from "styles/theme";
import { useNavigation } from "@react-navigation/core";
import { chain } from 'helpers/func';
import BottomHalfModal from "components/BottomHalfModal";
import Text from "components/Text";
import { IS_SMALLER } from "styles/responsive";

const microcopy = { title: "Choose Manual Transaction Type" };

const ExpensePaymentModal = ({ onHide, ...props }) => {
    const navigation = useNavigation()

    const handlePress = chain([
        (pageName) => navigation.navigate(pageName),
        () => onHide()
    ])

    return (
        <>
            <BottomHalfModal
                closeIcon={false}
                onHide={onHide}
                styles={{ headerTxt: IS_SMALLER && { fontSize: 14 } }}
                {...microcopy}
                {...props}
            >
                <View style={styles.secHeadContainer}>
                    <View style={styles.secHeadRow}>
                        <View style={{ ...styles.secHeadButton, ...{ borderColor: colors['additional/danger'] } }}>
                            <TouchableOpacity onPress={() => handlePress('ManualExpense')}>
                                <Image
                                    source={require('img/icons/manual-expense.png')}
                                    style={styles.secHeadButtonIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.secHeadButton, ...{ borderColor: colors['primary/50'] } }}>
                            <TouchableOpacity onPress={() => handlePress('ManualPaymentPage')}>
                                <Image
                                    source={require('img/icons/manual-payment.png')}
                                    style={styles.secHeadButtonIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.secHeadRow}>
                    <Text color={colors['additional/danger']} style={styles.secHeadButtonText}>Manual Expense</Text>
                    <Text color={colors['primary/50']} style={styles.secHeadButtonText}>Manual Payment</Text>
                </View>
            </BottomHalfModal>
        </>
    )
}
export default ExpensePaymentModal