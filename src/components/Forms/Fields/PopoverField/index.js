import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import SelectButtonInput from "components/SelectButtonInput";
import SelectButtonInputValue from "components/SelectButtonInputValue/SelectButtonInputValue";
import { useIsOpen } from "hooks/useIsOpen";
import GenericSelectModal from "components/GenericSelectModal";
import { t } from "helpers/react";
import { compact, isArray } from "lodash";

const PopoverField = ({ navigationProps, value:_value, Component = SelectButtonInput, triggerKey = "onAdd", isModal = true, popoverPageName = "GenericSelectScreen",openSelectOnValuePress, ...props }) => {
    const navigation = useNavigation();
    const { isOpen, open, close } = useIsOpen()
    
    let value = useMemo(() =>  normaliseSelectValues(_value), [_value])

    const handleNavigation = () => navigation.navigate(popoverPageName, { value, ...navigationProps })
    const openSelect = isModal ? open : handleNavigation;
    const actionProps = {[triggerKey]: openSelect};

    return (
        <>
            <Component
                value={value}
                addLabelTransform={null}
                mt={0}
                renderValueProps={openSelectOnValuePress && {onPress: openSelect}}
                {...actionProps}
                {...props}
            />
            {t(isModal, <GenericSelectModal
                visible={isOpen}
                value={value}
                onHide={close}
                {...navigationProps}
            />)}
        </>

    )
};
export const normaliseSelectValues = (value) => value &&  (isArray(value) ? value : [value]);

export const renderSelectInputbuttonValues = (value, textKey, imageKey, props) => compact(value).map((v, i) =>
    <SelectButtonInputValue
        text={v[textKey]}
        image={isArray(v[imageKey])  ? v[imageKey][0] : v[imageKey]}
        key={v?.id || i}
        {...props}
    />
);

export default PopoverField;