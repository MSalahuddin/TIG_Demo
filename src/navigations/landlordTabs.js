import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTab from './BottomTab';
import Icon from 'components/Icon';
import DrawerScreen from './DrawerScreen';
import LandlordServicesStackNavigator from './services';
import LandlordTenantsStackNavigator from './landlordTenants';
import LandlordDocumentsStackNavigator from './landlordDocuments';
import NotificationsRoot from 'pages/notifications/NotificationsRoot';
import TasksEvents from 'pages/tasks/TasksEvents';
import PropertiesList from 'pages/properties/PropertiesList';
import FinancialsRoot from 'pages/financials/FinancialsRoot';
import LandlordPropertiesStackNavigator from './landlordProperties';

const Tab = createBottomTabNavigator();

const LandlordTabNavigator = () => {
  return (
    <DrawerScreen>
      <Tab.Navigator
        initialRouteName="LandlordTasks"
        // unmountInactiveScreens
        // lazy={false}
        tabBar={props => <BottomTab {...props} />}>
        <Tab.Screen
          name="LandlordTasks"
          component={TasksEvents}
          options={({route}) => ({
            tabBarLabel: 'Tasks',
            tabBarIcon: require('img/icons/tasks.png'),
            tabBarIconActive: require('img/icons/tasks-active.png'),
          })}
        />
        <Tab.Screen
          name="LandlordProperties"
          component={LandlordPropertiesStackNavigator}
          options={({route}) => ({
            tabBarLabel: 'Properties',
            tabBarIcon: require('img/icons/properties.png'),
            tabBarIconActive: require('img/icons/properties-active.png'),
          })}
        />
        <Tab.Screen
          name="LandlordTenants"
          component={LandlordTenantsStackNavigator}
          options={({route}) => ({
            tabBarLabel: 'Tenants',
            tabBarIcon: require('img/icons/tenants.png'),
            tabBarIconActive: require('img/icons/tenants-active.png'),
          })}
        />
        <Tab.Screen
          name="LandlordServices"
          component={LandlordServicesStackNavigator}
          options={({route}) => ({
            tabBarLabel: 'Services',
            tabBarIcon: require('img/icons/maintenance.png'),
            tabBarIconActive: require('img/icons/maintenance-active.png'),
          })}
        />
        <Tab.Screen
          name="LandlordDocuments"
          component={LandlordDocumentsStackNavigator}
          options={({route}) => ({
            tabBarLabel: 'Documents',
            tabBarIcon: require('img/icons/documents.png'),
            tabBarIconActive: require('img/icons/documents-active.png'),
          })}
        />
        <Tab.Screen
          name="LandlordFinancials"
          component={FinancialsRoot}
          options={({route}) => ({
            tabBarLabel: 'Financials',
            hidden: true,
          })}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsRoot}
          options={({route}) => ({
            tabBarLabel: 'Notifications',
            hidden: true,
          })}
        />
      </Tab.Navigator>
    </DrawerScreen>
  );
};

export default LandlordTabNavigator;
