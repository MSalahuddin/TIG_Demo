import React from "react";
import DateField from "components/Forms/Fields/DateField"
import BuildingField from "components/Forms/Fields/BuildingField";
import UnitField from "components/Forms/Fields/UnitField";
import FiltersModal from "components/FiltersModal"; 
import { styles } from "./styles"
import { Container } from "components/Forms/Tasks/TaskForm";



const GraphFilters = ({ navigation, route, setFilter, visible, onHide, ...props }) => {

    return (
        <FiltersModal visible={visible} onHide={onHide}>
            <Container {...styles.container} {...styles.filterContainer}>
                <BuildingField />
                <UnitField />
                <DateField />
            </Container>
        </FiltersModal>
    )
}

export default GraphFilters