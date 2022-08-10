import React from 'react';
import {Layout} from '@ui-kitten/components';

import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import Box from 'components/Box';
import useSearch from 'hooks/useSearch';
import SearchTenants from './SearchTenants';
import TenantTabs from './TenantTabs';
import {createStackNavigator} from '@react-navigation/stack';
import useNotifications from 'hooks/useNotifications';

const Stack = createStackNavigator();

const TenantsList = ({navigation, route}) => {
  const {headerProps: searchHeaderProps, SearchScreen} = useSearch(
    SearchTenants,
    'SearchTenants',
    'TenantTabs',
  );
  const {unreadCount} = useNotifications();

  return (
    <Box flex={1} as={Layout}>
      <Box flex={1} as={SafeAreaView} forceInset={{top: 'always'}} pb={0}>
        <Header
          actions={[
            {
              icon: 'menu',
              left: true,
              onPress: () => navigation.openDrawer(),
            },
            {
              icon: 'bell',
              pack: 'pm',
              onPress: () => navigation.navigate('Notifications'),
              badge: Math.min(unreadCount ?? 0, 99),
            },
            {
              icon: 'plus-circle-outline',
              pack: 'pm',
              onPress: () => navigation.navigate('AddTenant'),
            },
          ]}
          alignment="center"
          {...searchHeaderProps}
        />
        <Stack.Navigator
          headerMode="none"
          mode="modal"
          keyboardHandlingEnabled={false}>
          <Stack.Screen name="TenantTabs" component={TenantTabs} />
          <Stack.Screen name="SearchTenants" component={SearchScreen} />
        </Stack.Navigator>
      </Box>
    </Box>
  );
};

export default TenantsList;
