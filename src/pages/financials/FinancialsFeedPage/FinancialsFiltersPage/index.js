import DateField from "components/Forms/Fields/DateField"
import BuildingField from "components/Forms/Fields/BuildingField";
import PaymentMethodField from "components/Forms/Fields/PaymentMethodField";
import TenantField from "components/Forms/Fields/TenantField";
import UnitField from "components/Forms/Fields/UnitField";
import { Container } from "components/Forms/Tasks/TaskForm";
import useFilter from "hooks/useFilter";
import React from "react";
import { styles } from "./styles"
import ActionBar from './ActionBar';
import FiltersModal from "components/FiltersModal"; 
import { format } from "helpers/date";
import { gqlDateFmt } from "pages/financials/const";
import { usaDateFormat } from "constants/dateFormat";

const FinancialsFiltersPage = ({  setFilter, visible, onHide, ...props }) => {
    const [filter, _setFilter] = useFilter([
        "building",
        "unit",
        "tenant",
        "paymentMethod",
        "dateRange"
    ])
    const setParentFilter = () => setFilter({
        building: filter?.building?.pk,
        unit: filter?.unit?.pk,
        payer: filter?.tenant?.pk,
        paymentMethod: filter?.paymentMethod,
        dateMin: format(filter?.dateRange?.[0], gqlDateFmt),
        dateMax: format(filter?.dateRange?.[1], gqlDateFmt)
    });

    return (
        <FiltersModal visible={visible} onHide={onHide} setFilter={setParentFilter} >
            <Container {...styles.container} {...styles.filterContainer}>
                <BuildingField
                    setValue={(val) => _setFilter("building", val)}
                    value={filter?.building}
                    Component={ActionBar}
                    openSelectOnValuePress={true}
                />
                <UnitField
                    setValue={val => _setFilter("unit", val)}
                    value={filter?.unit}
                    Component={ActionBar}
                    openSelectOnValuePress={true}
                    buildingId={filter?.building?.pk}

                />
                <TenantField
                    setValue={(val) => _setFilter("tenant", val)}
                    value={filter?.tenant}
                    Component={ActionBar}
                    openSelectOnValuePress={true}

                />
                <PaymentMethodField
                    setValue={(val) => _setFilter("paymentMethod", val)}
                    value={filter?.paymentMethod}
                    Component={ActionBar}
                    openSelectOnValuePress={true}

                />
                <DateField
                    copy={{ label: "Date", addLabel: usaDateFormat }}
                    value={filter?.dateRange?.[0]}
                    onSelect={(min) => _setFilter("dateRange", [min, filter?.dateRange?.[0]])}
                    editable={true}
                    labelStyle={styles.labelStyle}
                />
            </Container>
        </FiltersModal>
    )
}

export default FinancialsFiltersPage