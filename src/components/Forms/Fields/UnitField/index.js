import React from "react";
import SelectButtonInput from "components/SelectButtonInput";
import { useGetListProps } from "hooks/useGetListProps";
import unitSelectQuery from 'queries/properties/listUnitsSelect.gql';
import PopoverField, { renderSelectInputbuttonValues } from "../PopoverField";
import SelectItemCard from "components/SelectItemCard";

const defaultCopy = {
    addLabel: "Choose a unit",
    label: 'Unit'
};
const renderItem = ({ item, isSelected, onPress }) =>  <SelectItemCard text={item?.unitNumber} image={item?.photos?.[0]}  onPress={onPress} isSelected={isSelected} />
const defaultRenderValue = (units, props) => renderSelectInputbuttonValues(units, 'unitNumber', 'photos', props);

const UnitField = ({ setValue, value, copy = defaultCopy, buildingId, Component = SelectButtonInput, triggerKey = "onAdd", limit = 1, renderValue = defaultRenderValue, ...props }) => {

    const listProps = useGetListProps({ dataKey: 'units', labelKey: 'displayName' });

    return (
        <PopoverField
            Component={Component}
            value={value}
            triggerKey={triggerKey}
            setValue={setValue}
            renderValue={renderValue}
            navigationProps={{
                onSelect: ([unit]) => setValue(unit),
                header: "Select a Unit",
                renderItem,
                limit,
                query: unitSelectQuery,
                valueKey: "id",
                initialValues: limit === 1 ? value : [value],
                variables: { buildingId },
                ...listProps
            }}
            {...props}
            {...copy}
        />)
}

export default UnitField;