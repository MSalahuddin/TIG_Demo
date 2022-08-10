import React from "react";

import SelectButtonInput from "components/SelectButtonInput";
import { useGetListProps } from "hooks/useGetListProps";
import buildingSelectQuery from 'queries/properties/listPropertiesSelect.gql';
import PopoverField, { renderSelectInputbuttonValues } from "../PopoverField";
import SelectItemCard from "components/SelectItemCard";

const defaultCopy = {
    addLabel: "Choose a building",
    label: 'Building'
};

const renderItem = ({ item, isSelected, onPress }) => {
    return <SelectItemCard
        text={item?.displayName || item?.address}
        image={item?.photos?.[0]}
        onPress={onPress}
        isSelected={isSelected}
    />
}

export const defaultRenderValue = (buildings, props) => renderSelectInputbuttonValues(buildings, 'displayName', 'photos', props)
const BuildingField = ({ setValue, value, copy = defaultCopy, Component = SelectButtonInput, triggerKey = "onAdd", limit = 1, renderValue = defaultRenderValue,  ...props }) => {
    const buildingListProps = useGetListProps({ dataKey: 'buildings', labelKey: 'displayName' });
    return (
        <PopoverField
            Component={Component}
            value={value}
            triggerKey={triggerKey}
            setValue={setValue}
            renderValue={renderValue}
            navigationProps={{
                onSelect: ([building, ...rest]) => setValue(limit === 1 ? building : [building, ...rest]),
                header: "Select a Building",
                renderItem,
                limit,
                query: buildingSelectQuery,
                initialValues: limit === 1 ? value : [value],
                valueKey: "id",
                ...buildingListProps
            }}
            {...props}
            {...copy}
        />)
}

export default BuildingField;