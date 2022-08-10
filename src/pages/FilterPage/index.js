import React, { useCallback } from "react";
import { ScrollView } from "react-native";
import Box from "components/Box";
import Header from "components/Header";
import SelectButtonInput from "components/SelectButtonInput";
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { _switch } from "pages/tasks/TaskFiltersPage/styles";
import { chain } from "helpers/func";
import { noop } from "lodash";

export const getFilterProps = ({filter, setFilter}) => (field) => ({
    Component: SelectButtonInput,
    checked: filter[field],
    setValue: setFilter(field),
    styles: _switch,
    triggerKey: "onAdd",
})


const FiltersPage = ({ navigation, children, onApply = noop, styles: _styles = {} }) => {
    const handleApply = useCallback(chain([onApply,() => navigation.goBack()]), [navigation, onApply])

    return (
        <Box as={ScrollView} style={{ marginTop: getStatusBarHeight() +  10, ..._styles?.container }} >
            <Header title={"Filters"} leftText={'Done'} onPressLeftText={handleApply} divider />
            {children}
        </Box>
    )
}

export default FiltersPage