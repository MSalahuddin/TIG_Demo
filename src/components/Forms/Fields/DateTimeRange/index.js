import Box from "components/Box";
import SelectButtonInput from "components/SelectButtonInput";
import { format } from "helpers/date";
import { useIsOpen } from "hooks/useIsOpen";
import Calendar from 'components/Calendar';
import Text from '../../../Text';
import { colors } from "styles/theme";
import SwitchField from 'components/Forms/Fields/SwitchField';
import React, { useCallback, useEffect, useState } from "react";
import { chain } from "helpers/func";
import { styles, defaultCopy } from "./styles";
import BottomHalfModal from "components/BottomHalfModal";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import TimePickerModalField from "components/Forms/Fields/TimePickerModalField";
import useTheme from "hooks/useTheme";
import { TAB_ENUM } from "./const";
import { t } from 'helpers/react';
import { Icon } from '@ui-kitten/components';
import SelectInput from 'components/SelectInput';
import { usaDateFormat } from "constants/dateFormat";
import { workHoursDaysOptions } from "./WorkHoursField";


const defaultRenderValue = (value, labelStyle) => {
    const dateText = format(value?.startDate, usaDateFormat) + (value?.endDate ?  `- ${format(value?.endDate, usaDateFormat)}`: "")
    const timeText = formatTime(value?.startTime) + (value?.endTime ?  `- ${formatTime(value?.endTime)}`: "")
    return (
        <Box mx={2}>
            <Box my={1} flexDirection="row" alignItems="center" >
                {t(!!value?.startDate, <Icon style={{ marginRight: 8 }} width={15} height={15} pack={'pm'} name={"calendar_black"} />)}
                {t(!!value?.startDate, <Text style={labelStyle} >{dateText}</Text>)}
            </Box>
            <Box my={1} flexDirection="row" alignItems="center" >
                {t(!!value?.startTime, <Icon style={{ marginRight: 8 }} width={15} height={15} pack={'pm'} name={"clock"} />)}
                {t(!!value?.startTime, <Text style={labelStyle} >{timeText}</Text>)}
            </Box>
        </Box>
    )
}

const { height } = Dimensions.get("screen");
const formatTime = (date) => format(date, "hh:mm aaa", "", { toDate: true })
const DateTimeRange = ({ value, boundingMonth, onSelect, isDateRange, inputProps, copy = defaultCopy, labelStyle, Component = SelectButtonInput, triggerKey = "onAdd", editable = true, renderValue = defaultRenderValue, displayAllDay = true, isWeekdays, ...props }) => {
    const { isOpen, open, close } = useIsOpen();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activeTab, setActiveTab] = useState(TAB_ENUM.START_DATE);
    const [startTime, setStartTime] = useState(value?.startTime ?? new Date());
    const [endTime, setEndTime] = useState(value?.endTime ?? new Date());
    const [allDay, setAllDay] = useState(value?.allDay ?? false);

    const theme = useTheme();
    const actionsProps = { [triggerKey]: () => editable && open() }

    useEffect(() => {
        const initialStartDate = value?.startDate ?? !isWeekdays ? new Date() : workHoursDaysOptions[0];
        const initialEndDate = value?.endDate ?? !isWeekdays ? new Date() : workHoursDaysOptions[0]
        setStartDate(initialStartDate)
        setEndDate(initialEndDate)
    }, [])

    const cleanDate = (d, time) => {
        d.setHours(time?.getHours());
        d.setMinutes(time?.getMinutes());
        return d
    }

    const renderTabItem = useCallback(({ tabEnum, value }) => {
        return (
            <Box onPress={() => setActiveTab(tabEnum)} as={TouchableOpacity} mr={1} px={2} py={2}
                style={{ borderRadius: 8, borderWidth: 1, borderColor: activeTab === tabEnum ? colors['primary/50'] : colors['gray scale/10'] }}
                backgroundColor={activeTab === tabEnum ? colors['primary/50'] : '#fff'}
            >
                <Text style={{ color: activeTab === tabEnum ? '#fff' : colors['gray scale/90'], fontSize: 14 }}>{value}</Text>
            </Box>
        )
    }, [activeTab])

    const renderCustomTable = useCallback(({ onSelect, date }) => (
        <Calendar
            boundingMonth={boundingMonth}
            onSelect={onSelect}
            {...props}
            date={date} />
    ), [startDate]);

    const renderCustomTimePicker = useCallback(({ label, onSelect, time, tabEnum }) => {
        return <TimePickerModalField
            theme={theme}
            copy={{ modalLabel: label }}
            setValue={val => onSelect(val)}
            value={time}
            isDialogeOpen={activeTab == tabEnum}
        >
            {renderTabItem({ tabEnum, value: format(time || new Date(), 'HH:mm: SS') })}
        </TimePickerModalField>
    }, [activeTab]);

    const renderItem = useCallback(({ label, dateTab, date, timeLabel, timeTab, setTime, time }) => {
        return (
            <Box borderTopWidth={1} borderColor={colors["gray scale/10"]} flexDirection="row" alignItems="center" justifyContent="space-between" py={3} px={3}>
                <Text style={{ color: colors['gray scale/90'], fontSize: 18 }}>{label}</Text>
                <Box flexDirection="row" alignItems="center">
                    {renderTabItem({ tabEnum: dateTab, value: isWeekdays ? date?.title : date?.toLocaleDateString() })}
                    {!!!isDateRange && t(!!!allDay, renderCustomTimePicker({ label: timeLabel, onSelect: setTime, time, tabEnum: timeTab }))}
                </Box>
            </Box>
        )
    }, [activeTab, allDay, startDate, endDate]);

    const renderSelectWeekday = useCallback(({ onSelect, value, label }) => (
        <Box px={3} pb={2}>
            <SelectInput
                options={workHoursDaysOptions}
                label={label}
                mx={2}
                onSelect={onSelect}
                value={value?.title}
            />
        </Box>
    ));
    const renderTabContent = useCallback(({ isOpen, onSelect, time, date }) => {
        if (!isOpen) return null
        if (!isWeekdays) return renderCustomTable({ onSelect: (val) => onSelect(cleanDate(val, time)), date: date })
        else return renderSelectWeekday({ onSelect, value: date })

    }, [renderCustomTimePicker, renderSelectWeekday, cleanDate])

    return (
        <>
            <Component
                value={value}
                mt={1}
                styles={{ ...inputProps, changeBtn: styles.changeBtn }}
                labelStyle={labelStyle}
                renderValue={(val) => renderValue(val, labelStyle)}
                {...props}
                {...inputProps}
                {...actionsProps}
                {...copy}
            />
            <BottomHalfModal
                visible={isOpen}
                onHide={chain([close, () => onSelect({ startDate, endDate, startTime, endTime, allDay })])}
                styles={{ close: styles.close }}
                title={"Date"}
            >
                <Box as={ScrollView} height={(height / 100) * 70} {...styles.dateTimeRangeContent} >
                    {displayAllDay && <Box mx={2} mt={3}>
                        <SwitchField
                            label={"All day"}
                            checked={allDay}
                            onChange={(val) => setAllDay(val)}
                            containerStyle={{ height: 30, width: 50 }}
                            circleSize={26}
                            circleRadius={26}
                            styles={{ container: { paddingHorizontal: 1, marginBottom: 3, marginLeft: 1, } }}
                        />
                    </Box>}
                    {renderItem({ label: "Starts", dateTab: TAB_ENUM.START_DATE, date: startDate, timeLabel: "Start Time", timeTab: TAB_ENUM.START_TIME, setTime: setStartTime, time: startTime })}
                    {renderTabContent({ isOpen: activeTab != TAB_ENUM.END_DATE, onSelect: setStartDate, time: startTime, date: startDate })}
                    {renderItem({ label: "Ends", dateTab: TAB_ENUM.END_DATE, date: endDate, timeLabel: "End Time", timeTab: TAB_ENUM.END_TIME, setTime: setEndTime, time: endTime })}
                    {renderTabContent({ isOpen: activeTab === TAB_ENUM.END_DATE, onSelect: setEndDate, time: endTime, date: endDate })}
                </Box>
            </BottomHalfModal>
        </>

    )
};

export default DateTimeRange