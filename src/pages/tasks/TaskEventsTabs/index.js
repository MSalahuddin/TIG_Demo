import React, { useState } from 'react';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TopTab from 'navigations/TopTab';
import TaskListRoot from '../TaskListRoot';
import Events from '../Events';
import AddButton from './TabAddButton';

const Tab = createMaterialTopTabNavigator();

export const TASK_LIST_ROOT = "TaskListRoot"
export const CALENDAR = "Calendar";

const TaskEventsTabs = ({ navigation }) => {
    const [activeScreen, setActiveScreen] = useState(CALENDAR);
    return (
        <Tab.Navigator
            initialRouteName="TaskListRoot"
            pager={props => <ViewPagerAdapter {...props} />}
            tabBar={props => <TopTab onRouteChange={({index, routeNames}) => setActiveScreen(routeNames?.[index])}  {...props} ><AddButton screen={activeScreen} /></TopTab>}>
            <Tab.Screen
                name={TASK_LIST_ROOT}
                component={TaskListRoot}
                options={{ tabBarLabel: 'Tasks' }}
            />
            <Tab.Screen
                name={CALENDAR}
                component={Events}
                options={{ tabBarLabel: 'Calendar' }}
            />
        </Tab.Navigator>
    );
};

export default TaskEventsTabs;
