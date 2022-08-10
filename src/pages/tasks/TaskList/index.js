import React, { useCallback, useRef, useState } from 'react';
import { TouchableOpacity } from "react-native";
import { Icon, Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import MultiTextSwitch from 'components/MultiTextSwitch';
import Header from 'components/Header';
import { TASK_STATUSES, stringifyEnumValue } from 'constants/enums';
import listTasksQuery from 'queries/tasks/listTasks.gql';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Text from 'components/Text';
import TaskItem from 'components/TaskItem';
import Dialog from 'components/Dialog';
import useTaskStatusSetter from 'hooks/useTaskStatusSetter';
import { checkStatusAction, taskStatusColorMap, uncheckStatusAction } from '../consts';
import { t } from 'helpers/react';
import RestoreTaskModal from 'components/TaskItem/RestoreTaskModal/index.';
import { getActions } from 'constants/actions';
import { buttons } from 'constants/buttons';
import { floorDate } from 'helpers/date';
import { useIsOpen } from 'hooks/useIsOpen';
import TaskFiltersModal from '../TaskFiltersModal';
import useTheme from 'hooks/useTheme';
import { colors } from "styles/theme";
import { typography } from 'styles/typography';
import { styles } from './styles';
import useFilter from "hooks/useFilter";

const FilterButton = ({ icon, title, value, isSelected, onPress, theme }) => {
    const textStyle = [
        { color: isSelected ? colors['white'] : 'black' },
        typography["body/small – regular"]
    ]
    return (
        <Box width={"48%"} px={3} py={2} onPress={onPress} as={TouchableOpacity}
            style={styles?.filterButtonContainer} backgroundColor={isSelected ? theme["primary/50"] : colors['white']}>
            <Box my={1} flexDirection="row" style={{ justifyContent: "space-between" }}>
                <Icon height={18} width={18} pack={'pm'} name={`${icon}-${isSelected ? "white" : "black"}`} />
                <Text style={[textStyle, { fontSize: 18 }]}>{value}</Text>
            </Box>
            <Text style={textStyle}>{title}</Text>
        </Box>
    )

}

const TaskList = ({ navigation, route }) => {
    const [restoreModalProps, setRestoreModalProps] = useState({ visible: false })
    const [statusFilter, setStatusFilter] = useState(TASK_STATUSES.TO_DO);
    const [{ overdueCount, recentCount }, setCounts] = useState({})
    const listRef = useRef();
    const [isRecent, setIsRecent] = useState(true);
    const theme = useTheme();
    const [filter] = useFilter(["tasksFeed"]);

    const variables = React.useMemo(() => ({ ...filter?.tasksFeed }), [filter?.tasksFeed]);
    const onRemove = React.useCallback(id => listRef.current?.removeItem(id), []);

    const { onSetStatus, modalProps, successModal } = useTaskStatusSetter(statusFilter, onRemove);
    const today = new Date()
    const listFilter = React.useMemo(
        () => ({
            ...(route?.params?.categoryFilter ?? {}),
            status: statusFilter,
            recentDate: today,
            overdueDate: today,
            [!isRecent ? "dueMax" : "dueMin"]: today,
            ...variables,
        }),
        [route, statusFilter, isRecent, today, variables],
    );

    const isOnArchived = statusFilter === TASK_STATUSES.ARCHIVED;
    const isOnDone = statusFilter === TASK_STATUSES.DONE

    const getItemProps = (item, isOnArchived) => {
        const navigationOptions = { id: item.id, onUpdate: listRef.current?.refresh }
        const onSwipablePress = () => isOnArchived ? setRestoreModalProps({ taskId: item.id, visible: true }) :
            onSetStatus(
                item.id,
                TASK_STATUSES.ARCHIVED,
            )
        const rightButton = { ...(buttons[isOnArchived ? "restore" : "archive"]), onPress: onSwipablePress }
        return {
            themeColor: taskStatusColorMap[statusFilter],
            rightButton,
            initialChecked: isOnDone,
            onPress: () => navigation.navigate('ViewTask', navigationOptions),
            onCheck: !item.systemTask && checkStatusAction[statusFilter]
                && (() => onSetStatus(item.id, checkStatusAction[statusFilter])),
            onUnCheck:
                !item.systemTask && uncheckStatusAction[statusFilter]
                && (() => onSetStatus(item.id, uncheckStatusAction[statusFilter])),
            ...item
        }
    };

    const listProps = React.useMemo(() => {

        return {
            keyExtractor: item => item.id,
            renderItem: ({ item }) => <TaskItem {...getItemProps(item, isOnArchived)} />,
            dataExtractor: data => data.tasks,
            sections: ['Overdue', 'Today', 'Tomorrow', 'This Week', 'Upcoming'],
            sectionExtractor,
            renderSectionHeader
        };
    }, [navigation, onRemove, onSetStatus, statusFilter, isOnArchived]);
    const { isOpen: displayFilters, open: openFilters, close: closeFilters } = useIsOpen()


    const renderList = useCallback(() => (
        <Box flex={1} position="relative">
            <InfiniteFlatList
                key={statusFilter}
                refreshOnLoad
                query={listTasksQuery}
                variables={listFilter}
                onResCallback={(res) => setCounts({ recentCount: res?.data?.recentCount?.totalCount, overdueCount: res?.data?.overdueCount?.totalCount })}
                ref={listRef}
                {...listProps}
            />
        </Box>

    ), [listProps, statusFilter, listRef, isRecent, variables])


    return (
        <>
            <Box as={Layout} flex={1}>
                <Header
                    subtitle={route?.params?.categoryName ?? 'Tasks'}
                    divider
                    actions={getActions(["back", { onPress: () => navigation.navigate("ListCategories") }], ["filter", { onPress: openFilters }])}
                />
                <Box justifyContent="center" py="3" flex={1}>
                    <Box my="2" px="40">
                        <MultiTextSwitch
                            shape="circle"
                            size="small"
                            onSelect={option => setStatusFilter(option.value)}
                            options={Object.values(TASK_STATUSES).map(value => ({
                                text: stringifyEnumValue(TASK_STATUSES, value),
                                themeColor: taskStatusColorMap[value],
                                value,
                            }))}
                        />
                    </Box>
                    <Box py={3} px={3} flexDirection="row" justifyContent={"space-between"} >
                        <FilterButton
                            icon="flag"
                            title="Recent"
                            value={recentCount || 0}
                            isSelected={isRecent}
                            onPress={() => setIsRecent(true)}
                            theme={theme}
                        />
                        <FilterButton
                            icon="overdue"
                            title="Overdue"
                            value={overdueCount || 0}
                            isSelected={!isRecent}
                            onPress={() => setIsRecent(false)}
                            theme={theme}
                        />
                    </Box>
                    {renderList()}
                </Box>
                <Dialog {...modalProps} />
                {successModal}
                {t(isOnArchived, <RestoreTaskModal {...restoreModalProps} onHide={() => setRestoreModalProps({ visible: false })} />)}
            </Box>
            <TaskFiltersModal visible={displayFilters} onHide={closeFilters} />
        </>
    );
};

const sectionExtractor = item => {
    const due = new Date(item.due);
    const now = new Date();
    const tmrow = new Date(now);
    floorDate(tmrow)
    tmrow.setDate(tmrow.getDate() + 1);
    const day = 60 * 60 * 24 * 1000;
    if (due < now) {
        return 'Overdue';
    } else if (due.getTime() < tmrow.getTime()) {
        return 'Today';
    } else if (due.getTime() < tmrow.getTime() + day) {
        return 'Tomorrow';
    } else if (due.getTime() < tmrow.getTime() + 6 * day) {
        return 'This Week';
    }
    return 'Upcoming';
}

export const renderSectionHeader = ({ section }, textProps) => (
    <Box
        as={Layout}
        pt="3"
        mb="2"
        px="3"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <Text category="h6" appearance="hint" {...textProps}>
            {section.title}
        </Text>
    </Box>
);

export default TaskList;
