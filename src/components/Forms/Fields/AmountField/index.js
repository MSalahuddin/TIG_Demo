import BorderedText from "components/BorderedText";
import Box from "components/Box";
import SelectButtonInput from "components/SelectButtonInput";
import PaymentMethodButton from "pages/financials/FinancialsFeedPage/FinancialsFiltersPage/PaymentMethodButton";
import React from "react";
import { colors } from "styles/theme";
import PopoverField from "../PopoverField";


const defaultRenderValue = ([val]) => <Box flexDirection="row">
    <BorderedText bw={0} fw="400" mx={3} bgc={colors["primary/50"]} text={"$ " + val?.amount} c={"#fff"} />
    <PaymentMethodButton paymentMethod={val?.paymentMethod} />
</Box>
const AmountField = ({ Component = SelectButtonInput, triggerKey = "onAdd", limit, setPaymentMethod, setAmount, value, renderValue = defaultRenderValue, setValue, ...props }) => {
    
    const onDone = ({ amount, paymentMethod }) => {
        if (setValue) return setValue({amount, paymentMethod})
        setAmount(amount)
        setPaymentMethod(paymentMethod)
    }

    return (
        <PopoverField
            navigationProps={{ header: "Enter Amount", onDone }}
            value={value}
            isModal={false}
            popoverPageName="AmountPage"
            label={"Amount"}
            renderValue={renderValue}
            {...props}
        />
    )
};

export default AmountField;