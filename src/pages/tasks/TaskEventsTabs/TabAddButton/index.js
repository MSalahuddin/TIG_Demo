import React, { useMemo } from "react"

import { Icon } from "@ui-kitten/components";
import Button from "components/Button";
import Dialog from "components/Dialog";

import { useNavigation } from '@react-navigation/core';
import { useIsOpen } from 'hooks/useIsOpen';
import { noop } from "lodash";
import { colors } from "styles/theme";

const _buttons = [
    {
        children: "New appointment",
        hide: true,
        style: {
            marginTop: 12,
        },
        textStyle: { fontSize: 18 },

    },
    {
        children: "New task",
        hide: true,
        style: {
            marginTop: 7,
        },
        textStyle: { fontSize: 18 },

    },
    {
        children: "Back",
        style: {
            marginTop: 7,
            backgroundColor: "#fff",
            color: "red"
        },
        textStyle: { color: colors["primary/50"], fontSize: 18 },
        hide: true,
    }
];

const CalendarIcon = () => <Icon height={18} width={18} marginTop={-3} marginLeft={-7} name={"calendar_theme"} pack={"pm"} />
const AddButton = ({ screen }) => {
    const { isOpen, open, close } = useIsOpen();
    const navigation = useNavigation();
    const toTaskForm = () => navigation.navigate("EditTask", { goBack: () => navigation.navigate("TaskEventsTabs") })
    const handleBtnPress = (f = noop) => {
        close()
        f()
    }
    const buttons = useMemo(() => ([
        { ..._buttons[0], onPress: () => handleBtnPress(() => navigation.navigate("EditEvent")) },
        { ..._buttons[1], onPress: () => handleBtnPress(toTaskForm) },
        { ..._buttons[2], onPress: () => handleBtnPress() }
    ]))

    const dynamicProps = {
        ["Calendar"]: {
            onPress: open,
            icon: CalendarIcon
        },
        ["TaskListRoot"]: {
            onPress: toTaskForm
        }
    };

    return (
        <>
            <Button shadow={false} style={{ backgroundColor: "#fff", borderWidth: 0, justifyContent: "center", flexDirection: "row-reverse" }} textStyle={{ color: colors['primary/50'], fontSize: 16 }} {...dynamicProps?.[screen]}>Add</Button>
            <Dialog
                visible={isOpen}
                onHide={close}
                buttons={buttons}
                closeIcon={false}
                styles={{ view: { padding: 18 } }}
                title={"What would you like to add?"}
            />
        </>
    )
}
export default AddButton;