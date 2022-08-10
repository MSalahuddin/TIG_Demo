import { Container } from "components/Forms/Tasks/TaskForm";
import React from "react";
import Box from "components/Box";
import useTheme from "hooks/useTheme";
import { TouchableWithoutFeedback, View } from "react-native";
import SelectButtonInput from "components/SelectButtonInput";
import { TaskInput } from "components/Forms/Tasks/TaskForm/styles";
import { compact } from "lodash";
import { Icon } from "@ui-kitten/components";
import { colors } from "styles/theme";

const SubtaskInput = ({ index, theme, autofocus, addSubtask, handleDelete, sub }) => {
    return (
        <Box
            appearance="outline"
            style={{ borderColor: theme['grey-100'] }}
            borderWidth={1}
            width={"100%"}
            flexDirection={"row"}
            justifyContent="flex-start"
            alignItems={"center"}
            borderRadius={4}
            px={2}
            mb={1}
            mt={1}
        >
            <TaskInput
                flex={1}
                mt="-2px"
                value={sub}
                opacity={0.9}
                width={"100%"}
                style={{width: "90%"}}
                textStyle={{
                    color: theme['grey-400'],
                    fontFamily: theme['text-paragraph-2-font-family'],
                    fontWeight: theme['text-paragraph-2-font-weight'],
                    fontSize: theme['text-paragraph-2-font-size'],
                    lineHeight: theme['text-paragraph-2-line-height'],
                }}
                autoFocus={autofocus}
                placeholder={"Add subtask"}
                onChangeText={(val) =>addSubtask(val, index) }
            />
            <TouchableWithoutFeedback px="2px" mr="3px" onPress={() => handleDelete(sub, index)}>
                <View style={styles.dotContainer}>
                    <Icon name={"close"} width={12} height={12} style={styles.deleteIcon} />
                </View>
            </TouchableWithoutFeedback>
        </Box>
    )
}

const SubtasksField = ({ values, setValue, autofocus }) => {
    const theme = useTheme();

    const addSubtask = (val, i) => {
        if (!val.length) return
        let _values = values.slice();
        _values[i] = val
        setValue('subTasks', compact([..._values]))
    };
    
    const handleDelete = (s, i) => setValue("subTasks", values.filter(_s => _s !== s))

    return (
        <Container height={null} style={{ marginTop: 18 }} pb={1} theme={theme}>
            <SelectButtonInput
                label={"Subtasks"}
                addLabel={"Add subtask"}
                changeBtnText="Add"
                displayChange
                onAdd={() => setValue('subTasks', [...values, ''])}
                value={values.length && values?.map((sub, key) => 
                    <SubtaskInput 
                        addSubtask={(val) => addSubtask(val, key)} 
                        sub={sub} 
                        index={key} 
                        theme={theme} 
                        values={values} 
                        autofocus={autofocus && key === values.length - 1 } 
                        handleDelete={handleDelete} 
                    />
                )}
                buttonProps={{ marginTop: 0 }}
            />
        </Container>
    )
};

const styles = {
    dotContainer: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        margin: 6,
        borderColor: colors['gray scale/40'],
        padding: 1
    },
    deleteIcon: { opacity: 0.54 }
}
export default SubtasksField;