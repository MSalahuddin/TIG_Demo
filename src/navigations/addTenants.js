import React from 'react';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddTenant from 'pages/tenants/AddTenant';
import Box from 'components/Box';
import { getActions } from 'constants/actions';
import SafeAreaView from 'components/SafeAreaView';
import TopTab from './TopTab';
import HeadedScreen from 'components/HeadedScreen';
import { colors } from 'styles/theme';
import TenantLeaseForm from 'pages/tenants/AddTenant/AddTenantLease';

const Tab = createMaterialTopTabNavigator();
const AddTenantsTabs = ({ navigation, route }) => {
    return (
        <Box as={SafeAreaView} flex={1} forceInset={{ top: 'always' }} pb={4}>
            <HeadedScreen title={`Add New Tenant`} actions={getActions(['back', { onPress: () => navigation.goBack() }])} headerStyle={{ backgroundColor: colors['white'] }}>
                <Tab.Navigator
                    pager={pagerProps => <ViewPagerAdapter {...pagerProps} />}
                    tabBar={tabBarProps => <TopTab isPointTab {...tabBarProps} />}>
                    <Tab.Screen
                        name="AddTenantsTenant"
                        key="Tenant"
                        component={AddTenant}
                        initialParams={{ type: 'Tenant', ...route.params }}
                        options={{ tabBarLabel: 'Tenant', index: 1 }}
                    />
                    <Tab.Screen
                        name="AddTenantsUnit"
                        key="Unit"
                        component={TenantLeaseForm}
                        initialParams={{ type: 'Unit' }}
                        options={{ tabBarLabel: 'Unit', index: 2 }}
                    />
                </Tab.Navigator>
            </HeadedScreen>
        </Box>
    );
};

export default AddTenantsTabs;
