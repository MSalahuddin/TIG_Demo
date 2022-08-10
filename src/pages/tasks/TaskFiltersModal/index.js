import DateFilter from "components/Filters/DateFilter";
import FiltersModal from "components/FiltersModal";
import BuildingField from "components/Forms/Fields/BuildingField";
import CategoryInputField from "components/Forms/Fields/CategoryInputField";
import MultiSelectBoxes from "components/Forms/Fields/MultiSelectBoxes";
import UnitField from "components/Forms/Fields/UnitField";
import { Container } from "components/Forms/Tasks/TaskForm";
import { stringifyEnumValue, TASK_PRIORITY, TASK_TYPES } from "constants/enums";
import useFilter from "hooks/useFilter";
import { noop } from "lodash";
import { getFilterProps as _getFilterProps } from "pages/FilterPage";
import React, { useMemo } from "react";
import DateTimeRange from 'components/Forms/Fields/DateTimeRange';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import Box from 'components/Box';
import { styles } from "./styles";

const TaskFiltersModal = ({ navigation, setFilter: setParentFilter, visible, onHide, ...props }) => {
    const [filter, _setFilter] = useFilter([
        "building",
        "unit",
        "taskType",
        "priority",
        "startDate",
        "endDate"
    ])

    const setFilter = (field) => (val) => _setFilter(field, val);
    const getFilterProps = useMemo(() => _getFilterProps({ filter, setFilter }), [filter, setFilter]);

    const handleApplyFilters = () => _setFilter("tasksFeed", {
        buildingId: filter?.building?.id,
        unitId: filter?.unit?.id,
        priority: filter?.priority,
        dueMin: filter?.startDate,
        dueMax: filter?.endDate
    });

    return (
        <FiltersModal visible={visible} onHide={onHide} setFilter={handleApplyFilters} >
            <Container {...styles.container}>
                <BuildingField value={filter?.building?.id} {...getFilterProps("building")} />
                <UnitField value={filter?.unit?.id} {...getFilterProps("unit")} />
            </Container>
            <Container {...styles.container}>
                <MultiSelectBoxes
                    label={"Task Priority"}
                    value={filter?.priority}
                    values={TASK_PRIORITY}
                    onPress={setFilter("priority")}
                    {...styles.priority}
                />
            </Container>
            <Box
                my="2px"
                justifyContent="space-between">
                <DateTimeRange
                    copy={{ label: "Date" }}
                    px={3}
                    borderColor={colors["gray scale/10"]}   
                    onSelect={({ startDate, endDate }) => {
                        _setFilter('startDate', startDate)
                        _setFilter('endDate', endDate)
                    }}
                    value={(filter?.startDate && { startDate: filter?.startDate, endDate: filter?.endDate })}
                    labelStyle={typography["body/medium – regular"]}
                    isDateRange={true}
                />
            </Box>
        </FiltersModal>
    )
}

export default TaskFiltersModal
