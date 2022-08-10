import React, { useCallback, useEffect, useState } from 'react';
import TaskScreenLayout from 'components/TaskScreenLayout';
import { useQuery } from 'urql';
import viewTaskQuery from 'queries/tasks/viewTask.gql';
import Box from 'components/Box';
import useAuth from 'hooks/useAuth';
import useTheme from 'hooks/useTheme';
import {
    stringifyEnumValue,
    TASK_STATUSES,
} from 'constants/enums';

import { t } from 'helpers/react';
import Divider from 'components/Divider';
import Features from 'components/Features';
import ViewTaskActions from './ViewTaskActions';
import ViewTaskAssigneesSection from './ViewTaskAssigneesSection';
import ViewTaskGallerySection from './ViewTaskGallerySection';
import ViewTaskSubtaskSection from './ViewTaskSubtaskSection';
import ViewTaskHeaderSection from './ViewTaskHeaderSection';
import { getCreatedFeatures, getFeatureReminderFeatures, styles } from './styles';
import { statusThemeMap, taskStatusColorMap } from '../consts';
import { getActions } from 'constants/actions';
import DragUpBottomModal from 'components/Modals/DragUpBottomModal';
import Text from 'components/Text';
import { button_styles } from 'styles/button';
import ActivityFeed from 'components/ActivityFeed';
import { typography } from 'styles/typography';
import { Icon } from '@ui-kitten/components';


const ViewTask = ({ navigation, route }) => {
    const taskId = route.params?.id;
    const { user } = useAuth();
    const theme = useTheme();
    const [refreshing, setRefreshing] = useState(false);

    const [res, executeQuery] = useQuery({
        query: viewTaskQuery,
        variables: {
            id: taskId,
        },
        requestPolicy: 'cache-and-network',
    });

    const task = res.data?.task;
    useEffect(() => {
        if (refreshing && !res.fetching) {
            setRefreshing(false);
            route.params?.onUpdate?.();
        }
        navigation.setParams({ taskStatus: task?.status });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [res.fetching]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        executeQuery({ requestPolicy: 'network-only' });
    }, [executeQuery]);

    const headerProps = React.useMemo(() => {
        const canEdit = user?.id === task?.user?.id;
        return {
            title: t(task?.status, stringifyEnumValue(TASK_STATUSES, task?.status),),
            actions: getActions(
                ["back", { onPress: () => navigation.goBack({ status: task?.status }) }],
                canEdit && ["edit", { onPress: () => navigation.navigate('EditTask', { id: task?.id, onUpdate: onRefresh, }), disabled: !task?.id }]
            )

        };
    }, [navigation, onRefresh, task, user]);

    const isLoading = (res.fetching && !refreshing);
    return (
        <>
            <TaskScreenLayout
                refreshing={refreshing}
                onRefresh={onRefresh}
                status={statusThemeMap[task?.status]}
                isLoading={isLoading}
                headerProps={headerProps}>
                <Box flex={1} py="3" px={24}>
                    <Box flex={1}>
                        <ViewTaskHeaderSection {...task} />
                        <Features features={getFeatureReminderFeatures(task?.due, task?.reminder)} theme={theme} styles={styles.dueFeatures(theme)} />
                        <Divider mt={10} />
                        <ViewTaskSubtaskSection onRefresh={onRefresh} subtasks={task?.subTasks} theme={theme} themeColor={taskStatusColorMap[task?.status]} taskId={task?.id} />
                        <ViewTaskGallerySection files={task?.files} theme={theme} />
                        <ViewTaskAssigneesSection assignees={task?.assignees?.edges} theme={theme} />
                        <Features features={getCreatedFeatures(task?.user, task?.createdAt)} theme={theme} styles={styles.createdFeatures(theme)} />
                    </Box>
                    <ViewTaskActions onRefresh={onRefresh} taskId={task?.id} {...task} />
                </Box>
            </TaskScreenLayout>
            <DragUpBottomModal
                closedContent={<Box flexDirection={"row"} justifyContent={"flex-end"} alignItem={"center"} width={"100%"}  >
                    <Box
                        flexDirection={"row"}
                        mr={18}
                        px={2}
                        py={1}
                        alignItem={"center"}
                        {...button_styles["clear_grey_border"]}
                    >
                        <Icon pack={"pm"} name={"comment"}  width={18} height={18} style={{marginRight: 7}} />
                        <Text style={typography["body/x-small – regular"]}>{`${task?.activityFeed?.activitySet?.edgeCount}`}</Text>
                    </Box>
                </Box>}
                closedContentProps={{ flexDirection: "row", justifyContent: "space-between" }}
                openedHeader={"More Info"}
            >
                <ActivityFeed feedId={task?.activityFeed?.pk} />
            </DragUpBottomModal>
        </>

    );
};

export default ViewTask;
