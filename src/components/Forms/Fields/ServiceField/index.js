import React from "react";

import SelectButtonInput from "components/SelectButtonInput";
import { useGetListProps } from "hooks/useGetListProps";
import listTypesOfService from 'queries/services/listTypesOfService.gql'
import PopoverField, { normaliseSelectValues } from "../PopoverField";
import { SvgUri } from "react-native-svg";
import SelectItemCard from "components/SelectItemCard";
import { colors } from "styles/theme";
import Box from "components/Box";
import SelectButtonInputValue from "components/SelectButtonInputValue/SelectButtonInputValue";

const renderItem = ({ item, isSelected, onPress }) => (
    <SelectItemCard
        isSelected={isSelected}
        text={item.name}
        image={item?.svg}
        onPress={onPress}
        imageRenderType={item?.svg ? SvgUri : Box}
        icon={!item.svg && "default-service-type"}
        styles={base_styles}
    />
);

const defaultRenderValue = (services, props) => {
    return (
        <>
            {services.map(service => (
                <SelectButtonInputValue
                    text={service?.name}
                    imageRenderType={service?.svg ? SvgUri : Box}
                    icon={!service.svg && "default-service-type"}
                    image={service?.svg}
                    key={service?.id}
                    styles={base_styles}
                    {...props}
                />
            ))}
        </>

    )
}

const ServiceField = ({ Component = SelectButtonInput, triggerKey = "onAdd", setValue, value, renderValue = defaultRenderValue, label = "Type of service", ...props }) => {
    const listProps = useGetListProps({ dataKey: "serviceCategories", labelKey: 'displayName' });
    return (
        <PopoverField
            value={normaliseSelectValues(value)}
            triggerKey={triggerKey}
            Component={Component}
            renderValue={renderValue}
            navigationProps={{
                value,
                onSelect: ([val]) => setValue(val),
                header: "Select a service",
                renderItem,
                valueKey: "id",
                query: listTypesOfService,
                variables: { subCategories_Isnull: true },
                ...listProps
            }}
            {...props}
            label={label}
        />
    )
}
const base_styles = {
    container: {
        width: "100%", justifyContent: "space-between", alignItems: "center", paddingBottom: 0, marginVertical: "3%"
    },
    imageContainer: { backgroundColor: colors["primary/5"], height: 48, borderRadius: 12, width: 48, justifyContent: "center", alignItems: "center", },
    text: { maxWidth: "72%" },
    image: {
        backgroundColor: "transparent",
        borderWidth: 0

    }

}


export default ServiceField;