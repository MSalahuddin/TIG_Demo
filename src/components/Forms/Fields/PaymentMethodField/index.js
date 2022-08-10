import { PAYMENT_METHODS, stringifyEnumKey, stringifyEnumValue } from "constants/enums";
import React, { useCallback } from "react";
import PopoverField from "../PopoverField";
import SelectButtonInput from "components/SelectButtonInput";
import PaymentMethodButton from "pages/financials/FinancialsFeedPage/FinancialsFiltersPage/PaymentMethodButton";
import SelectListItem from "components/SelectListItem/SelectListItem";
import PaymentMethodIcon from "components/PaymentMethodIcon";
import { colors } from "styles/theme";
import Box from "components/Box";

const defaultRenderValue = (methods) => methods.map(m => <PaymentMethodButton paymentMethod={m} />)
const PaymentMethodField = ({ Component = SelectButtonInput, triggerKey = "onAdd", setValue, value, renderValue = defaultRenderValue,limit = false, ...props }) => {
    const renderItem = useCallback(
        ({ item, isSelected, onPress }) => {
            return (
                <SelectListItem
                    isSelected={isSelected}
                    onPress={onPress}
                    item={item}
                    text={stringifyEnumValue(PAYMENT_METHODS, item)}
                    icon={
                        <Box marginRight={12}>
                            <PaymentMethodIcon method={stringifyEnumKey(item)} fill={isSelected ? colors['primary/50'] : colors['gray scale/90']} />
                        </Box>
                    }
                />
            );
        },
        [],
    );
    const options = Object.values(PAYMENT_METHODS);
    return (
        <PopoverField
            triggerKey={triggerKey}
            Component={Component}
            value={value}
            setValue={setValue}
            renderValue={renderValue}
            navigationProps={{
                value: value,
                onSelect: (paymentForm) => setValue(paymentForm),
                header: "Select Payment Method",
                renderItem,
                limit,
                options
            }}
            mb={null}
            {...props}
            label={"Payment Method"}
        />
    )
};

export default PaymentMethodField;