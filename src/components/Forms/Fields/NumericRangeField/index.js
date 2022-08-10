import React from "react";
import Box from "components/Box";
import Input from "components/Input";
import {styles} from "./styles";
import InputLabel from "components/InputLabel";
import { input_label_14 } from "styles/reusable-classes";

const NumericInput = ({ onChange, ...props }) => {
    return (
        <Input
            keyboardType='numeric'
            onChangeText={val => onChange(val.replace(/[^0-9]/g, ''))}
            style={{ position: "relative"}}
            containerProps={{width: "40%", marginTop: -3}}
            {...props}
        />
    )
}

const NumericRangeField = ({ label, setMin, setMax, min, max, minPlaceholder="From", maxPlaceholder="To" }) => {
    return (
        <Box minHeight={72} borderBottomWidth={0} borderWidth={1} width={"100%"}justifyContent={"space-between"} {...styles?.container} >
            <InputLabel label={label}  borderWidth={1} style={input_label_14} />
            <Box height={54} style={styles?.inputsContainer} >
                <NumericInput height={"100%"} onChange={v => setMin(v)} value={min} placeholder={maxPlaceholder} />
                <Box position={"absolute"} borderTopWidth={2} left={"50%"} marginLeft={-1} bottom={"50%"} width={"7"} />
                <NumericInput height={"100%"} onChange={v => setMax(v)} value={max} placeholder={minPlaceholder} />
            </Box>
        </Box>
    )
};

export default NumericRangeField;