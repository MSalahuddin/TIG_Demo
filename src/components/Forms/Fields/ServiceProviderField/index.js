import React from "react";

import SelectButtonInput from "components/SelectButtonInput";
import { useGetListProps } from "hooks/useGetListProps";
import listServiceProvider from 'queries/services/serviceProviderSelect.gql'
import PopoverField, { renderSelectInputbuttonValues } from "../PopoverField";
import SelectItemCard from "components/SelectItemCard";

const providerItem = ({ item, isSelected, onPress }) => <SelectItemCard  image={item?.picture} text={item?.fullName}  isSelected={isSelected} onPress={onPress} roundedImg />

const defaultRenderValue = (providers, props) => renderSelectInputbuttonValues(providers, 'fullName', 'picture', {styles: {image: {borderRadius: 25}} , ...props})
const ServiceProviderField = ({ Component = SelectButtonInput, renderItem = providerItem, triggerKey = "onAdd", setValue, value, serviceId, serviceName, renderValue=defaultRenderValue, ...props }) => {
    const listProps = useGetListProps({ dataKey: "serviceProviders", labelKey: 'displayName' });
    return (
        <PopoverField
            triggerKey={triggerKey}
            Component={Component}
            value={value?.name || value}
            renderValue={renderValue}
            navigationProps={{
                value,
                onSelect: ([val]) => setValue(val),
                header: "Choose provider",
                renderItem,
                valueKey: "id",
                query: listServiceProvider,
                variables: { serviceId, serviceName },
                ...listProps
            }}
            {...props}
            label={"Pay to"}
        />)
}

export default ServiceProviderField;