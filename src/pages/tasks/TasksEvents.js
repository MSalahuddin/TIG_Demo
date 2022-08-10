import React from 'react';
import Box from 'components/Box';
import { Layout } from '@ui-kitten/components';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import { createStackNavigator } from '@react-navigation/stack';

import TaskSearch from './TaskSearch';
import useSearch from 'hooks/useSearch';
import useNotifications from 'hooks/useNotifications';
import TaskEventsTabs from './TaskEventsTabs';

const Stack = createStackNavigator();

const TasksEvents = ({ navigation }) => {
  const { headerProps: searchHeaderProps, SearchScreen } = useSearch(
    TaskSearch,
    'TaskSearch',
    'TaskEventsTabs',
  );

  const { unreadCount } = useNotifications();

  return (
    <Box flex={1} as={Layout}>
      <Box flex={1} as={SafeAreaView} forceInset={{ top: 'always' }} pb={0}>
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
              badge: Math.min(unreadCount ?? 0, 99),
              onPress: () => navigation.navigate('Notifications'),
            },
          ]}
          alignment="center"
          {...searchHeaderProps}
        />
        <Box flex={1}>
          <Stack.Navigator
            headerMode="none"
            mode="modal"
            keyboardHandlingEnabled={false}>
            <Stack.Screen component={TaskEventsTabs} name="TaskEventsTabs" />
            <Stack.Screen component={SearchScreen} name="TaskSearch" />
          </Stack.Navigator>
        </Box>
      </Box>
    </Box>
  );
};

export default TasksEvents;
