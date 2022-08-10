import React from "react";
import { renderPersonaItem } from "pages/tasks/SelectAssignees";
import { useGetListProps } from "hooks/useGetListProps";
import PopoverField from "../PopoverField";
import getManagementCompanyEmployees from 'queries/properties/getManagementUsers.gql'
import ButtonField from "../ButtonField";
import Persona from "components/Persona";


const defaultCopy = {label:"Management team" }
const ManagementTeamField = ({ Component = ButtonField, query = getManagementCompanyEmployees,triggerKey = "onPress", setValue, value, copy=defaultCopy, limit,...props }) => {
    const listProps = useGetListProps({ dataKey: "managementUsers", labelKey: "fullName" });
    return (
        <PopoverField
            triggerKey={triggerKey}
            Component={Component}
            value={value}
            setValue={setValue}
            copy={copy}
            navigationProps={{
                onSelect: (val) => setValue(val),
                header: "Select a Team",
                renderItem: renderPersonaItem,
                valueKey: "id",
                query,
                limit,
                ...listProps
            }}
            renderValue={value => value?.map(user => <Persona mt={1} profile={user?.picture} name={user?.fullName} />)}
            {...props}
        />
    )
};

export default ManagementTeamField;