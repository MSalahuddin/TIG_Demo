import React from 'react';
import {Text, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Box from 'components/Box';
import BottomTab from './BottomTab';
import Icon from 'components/Icon';
import ProfileNavigator from './profile';
import {Layout} from '@ui-kitten/components';
import TenantRentals from 'pages/rentals/TenantRentals';
import TenantMaintenanceStackNavigator from './tenantMaintenance';
import MaintenanceRequests from 'pages/maintenance/MaintenanceRequests';
import { colors } from 'styles/theme';

const Tab = createBottomTabNavigator();
const iconStyle = {width:24, height:24, fill:'#22272F'}
const activeIconStyle = {...iconStyle, fill: colors["primary/50"]}

const TenantNavigator = () => {
  return (
    <Box as={Layout} flex={1}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Tab.Navigator
        initialRouteName="TenantHome"
        tabBar={props => <BottomTab {...props} />}>
        <Tab.Screen
          name="TenantHome"
          component={TenantRentals}
          options={{
            tabBarLabel: 'Home',
            icon: ()=>Icon('nav-home','pm')({...iconStyle}),
            activeIcon: ()=>Icon('nav-home-active','pm')({...activeIconStyle})
          }}
        />
        <Tab.Screen
          name="TenantMaintenance"
          component={MaintenanceRequests}
          options={({route}) => ({
            tabBarLabel: 'Maintenance',
            icon: ()=>Icon('nav-wrench','pm')({...iconStyle}),
            activeIcon: ()=>Icon('nav-wrench-active','pm')({...activeIconStyle}),
          })}
        />
        <Tab.Screen
          name="TenantProfile"
          component={ProfileNavigator}
          options={{
            tabBarLabel: 'Profile',
            icon: ()=>Icon('nav-person','pm')({...iconStyle}),
            activeIcon: ()=>Icon('nav-person-active','pm')({...activeIconStyle}),
          }}
        />
      </Tab.Navigator>
    </Box>
  );
};

export default TenantNavigator;
