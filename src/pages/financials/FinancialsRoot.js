import React from 'react';
import Box from 'components/Box';
import { Layout } from '@ui-kitten/components';
import SafeAreaView from 'components/SafeAreaView';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useNotifications from 'hooks/useNotifications';
import useNestedNavigation from 'hooks/useNestedNavigation';
import FinancialsHome from './FinancialsHome';
import FinancialsFeedPage from './FinancialsFeedPage';
import TransactionDetails from './TransactionDetails';

import ManualExpense from 'components/Forms/ManualExpenseForm';
import ManualPayment from 'components/Forms/ManualPaymentForm';
import AmountPage from 'components/Forms/AmountPage/AmountPage';

const Tab = createMaterialTopTabNavigator();

const FinancialsRoot = ({ navigation, route }) => {
  const { unreadCount } = useNotifications();
  useNestedNavigation({ navigation, route });
  return (
    <Box as={Layout} flex={1}  borderColor={"orange"}>
      <Box flex={1} as={SafeAreaView} pb={0} forceInset={{ top: 'always' }}>
        <Tab.Navigator
          swipeEnabled={false}
          pager={pagerProps => <ViewPagerAdapter {...pagerProps} />}
          tabBar={tabBarProps => null}>
          <Tab.Screen name="FinancialsHomePage" component={FinancialsHome} />
          <Tab.Screen name="FinancialsFeed" component={FinancialsFeedPage}/>
          <Tab.Screen name="TransactionDetails" component={TransactionDetails} />
          <Tab.Screen name="ManualExpense" component={ManualExpense}/>
          <Tab.Screen name="ManualPaymentPage" component={ManualPayment}/>
          <Tab.Screen name="AmountPage" component={AmountPage}/>
        </Tab.Navigator>
      </Box>
    </Box>
  );
};

export default FinancialsRoot;
