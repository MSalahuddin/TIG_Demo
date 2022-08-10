import React from "react";

import SelectButtonInput from "components/SelectButtonInput";
import AttachmentModal from "components/AttachmentModal";
import { useIsOpen } from "hooks/useIsOpen";

import { colors } from "styles/theme";
import SelectButtonInputValue from "components/SelectButtonInputValue/SelectButtonInputValue";

const defaultRenderValue = (document) => <SelectButtonInputValue text={document[0]?.name} icon={"document"} styles={{ image: { backgroundColor: colors["primary/5"] } }} />
const AttachmentField = ({ value, setValue, Component = SelectButtonInput, renderValue = defaultRenderValue, ...props }) => {
    const { isOpen, open, close } = useIsOpen();

    return (
        <>
            <Component
                label={'Attachment'}
                onAdd={open}
                value={value}
                renderValue={renderValue}
            />
            <AttachmentModal
                onHide={close}
                title={'Add Attachment'}
                visible={isOpen}
                setValue={val => {
                    setValue(val)
                    close()
                }}
            />
        </>

    )
};

export default AttachmentField