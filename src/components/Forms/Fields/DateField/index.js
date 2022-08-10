import Box from "components/Box";
import SelectButtonInput from "components/SelectButtonInput";
import { format } from "helpers/date";
import { useIsOpen } from "hooks/useIsOpen";
import Calendar from 'components/Calendar';

import React, { useCallback, useEffect, useState } from "react";
import { chain } from "helpers/func";
import { styles, defaultCopy } from "./styles";
import BottomHalfModal from "components/BottomHalfModal";
import { Dimensions } from "react-native";
import { usaDateFormat } from "constants/dateFormat";
const { height } = Dimensions.get("screen")

const DateField = ({
    value, boundingMonth,
    onSelect, inputProps,
    copy = defaultCopy,
    labelStyle,
    Component = SelectButtonInput,
    triggerKey = "onAdd",
    editable = true,
    ...props
}) => {
    const { isOpen, open, close } = useIsOpen();
    const [date, setDate] = useState(props?.date ?? value ?? new Date());

    useEffect(() => props?.date &&setDate(props?.date), [props?.date])

    const actionsProps = { [triggerKey]: () => editable && open() }
    const setDateD = useCallback(
        d => {
            d.setHours(date?.getHours());
            d.setMinutes(date?.getMinutes());
            setDate(d);
        },
        [date],
    );
    return (
        <>
            <Component
                value={format(value, usaDateFormat)}
                mt={1}
                styles={{ ...inputProps, changeBtn: styles.changeBtn }}
                labelStyle={labelStyle}
                {...actionsProps}
                {...props}
                {...inputProps}
                {...copy}
            />
            <BottomHalfModal
                visible={isOpen}
                onHide={chain([close, () => onSelect(date)])}
                styles={{ close: styles.close }}
                title={"Choose Date"}
            >
                <Box backgroundColor={"#fff"} height={(height / 100) * 72} {...styles.content} >
                    <Box mb="3" >
                        <Calendar
                            boundingMonth={boundingMonth}
                            onSelect={setDateD}
                            {...props}
                            date={date}

                        />
                    </Box>
                </Box>
            </BottomHalfModal>
        </>

    )
};

export default DateField