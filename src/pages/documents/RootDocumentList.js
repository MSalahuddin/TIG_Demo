import React from 'react';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import {createStackNavigator} from '@react-navigation/stack';
import DocumentsTabs from './DocumentsTabs';
import useSearch from 'hooks/useSearch';
import DocumentsSearch from './DocumentsSearch';
import useNotifications from 'hooks/useNotifications';

const Stack = createStackNavigator();

const RootDocumentList = ({navigation}) => {
  const {headerProps: searchHeaderProps, SearchScreen} = useSearch(
    DocumentsSearch,
    'DocumentsSearch',
    'DocumentsTabs',
  );
  const {unreadCount} = useNotifications();

  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{top: 'always'}} pb={0}>
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
        <Stack.Navigator
          headerMode="none"
          mode="modal"
          keyboardHandlingEnabled={false}>
          <Stack.Screen component={DocumentsTabs} name="DocumentsTabs" />
          <Stack.Screen component={SearchScreen} name="DocumentsSearch" />
        </Stack.Navigator>
      </Box>
    </Box>
  );
};

export default RootDocumentList;
