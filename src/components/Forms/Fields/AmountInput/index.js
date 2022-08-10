import React from 'react';

import { isNaN, isNumber } from 'lodash';
import ValidatedInput from 'components/ValidatedInput';
import { Icon } from "@ui-kitten/components";
import Box from 'components/Box';

export const isValidAmountInput = (val) => {
    const float = parseFloat(val)
    return !isNaN(float) && isNumber(float)

}
const AmountInput = ({ prefix = "$", onChange, value = "", ...props }) => {
    const handleChange = (a) => {
        if (a  === "") return onChange(0)
        if (isValidAmountInput(a)) return onChange(a)
    }
    const to2Dp = () => {
        return handleChange(parseFloat(value).toFixed(2))
    }
    
    return (
            <ValidatedInput
                onChangeText={handleChange}
                keyboardType="number-pad"
                value={value}
                onBlur={to2Dp}
                flex={1}
                textStyle={{paddingLeft: 18}}
                icon={
                    (style) =>
                        <Box position={"absolute"} justifyContent={"center"} alignItems={"center"}  height={18} width={18}>
                            <Icon
                                {...style}
                                name={"dollar"}
                                pack={"pm"}
                                height={36}
                                width={36}
                            />
                        </Box>
                }
                {...props}
            />

    )
}

export default AmountInput