import SelectButtonInput from "components/SelectButtonInput";
import React, { useCallback } from "react";
import tenantsQuery from "queries/tenants/tenantSelectQuery.gql";
import { renderPersonaItem } from "pages/tasks/SelectAssignees";
import { useGetListProps } from "hooks/useGetListProps";
import PopoverField, { renderSelectInputbuttonValues } from "../PopoverField";


const defaultRenderValue = (users, props) => renderSelectInputbuttonValues(users, 'fullName', 'picture', props)
const TenantField = ({ Component = SelectButtonInput, query = tenantsQuery, triggerKey = "onAdd", limit, setValue, value, renderValue = defaultRenderValue, ...props }) => {
    const listProps = useGetListProps({ dataKey: "tenants", labelKey: "fullName" });
    const renderItem = useCallback(({ isSelected, onPress, item }) => renderPersonaItem({ isSelected, onPress, item }), [])
    return (
        <PopoverField
            triggerKey={triggerKey}
            Component={Component}
            value={value}
            setValue={setValue}
            navigationProps={{
                onSelect: ([val]) => setValue(val),
                header: "Select a Tenant",
                limit,
                renderItem,
                valueKey: "id",
                query,
                ...listProps
            }}
            renderValue={renderValue}
            {...props}
            label={"Tenant"}
        />
    )
};

export default TenantField;