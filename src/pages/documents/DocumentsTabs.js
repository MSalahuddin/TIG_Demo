import React from 'react';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTab from 'navigations/TopTab';
import DocumentList from 'components/DocumentList';

const Tab = createMaterialTopTabNavigator();

const DocumentsTabs = ({navigation}) => {
  return (
    <Tab.Navigator
      pager={pagerProps => <ViewPagerAdapter {...pagerProps} />}
      tabBar={tabBarProps => <TopTab {...tabBarProps} />}>
      <Tab.Screen
        name="Documents"
        key="Documents"
        component={DocumentList}
        initialParams={{type: 'documents'}}
        options={{tabBarLabel: 'My Documents'}}
      />
      <Tab.Screen
        name="Templates"
        key="Templates"
        component={DocumentList}
        initialParams={{type: 'templates'}}
        options={{tabBarLabel: 'Templates'}}
      />
    </Tab.Navigator>
  );
};

export default DocumentsTabs;
