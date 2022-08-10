import React from 'react';
import Box from 'components/Box';

import { button_styles } from 'styles/button';
import { Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/core';

export const STATUS_VARS = {
    ["OVERDUE"]: { buttonProps: { ...button_styles["clear_red_border"] }, text: "Pay Now" },
    ["UNPAID"]: { buttonProps: { ...button_styles["primary"] }, text: "Pay Now" },
    ["PENDING"]: { buttonProps: { ...button_styles["primary"], disabled: true }, text: "Pending" },
    ["PAID"]: { buttonProps: { ...button_styles["greyed"], disabled: true }, text: "Paid" },

}

const LeasePaymentButton = ({ status = "UNPAID", paymentId, ...props }) => {
    const { buttonProps, text } = STATUS_VARS[status];
    const navigation = useNavigation()
    return (
        <Box
            as={Button}
            onPress={() => navigation.navigate("MakePayment", { id: paymentId })}
            width={"90%"}
            {...buttonProps}
            {...props}
        >
            {text}
        </Box>


    );
};

export default LeasePaymentButton;
