import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent, {DrawerProgressContext} from './Drawer';
import LandlordTabNavigator from './landlordTabs';
import LandlordProfileNavigator from './profile';
import {Platform} from 'react-native';

const routes = [
  {route: 'LandlordTabs', label: 'Home'},
  {route: 'LandlordProfile', label: 'Profile'},
  {route: 'LandlordFinancials', label: 'Financials'},
  {route: 'LandlordCompliance', label: 'Compliance'},
  // {route: 'LandlordResources', label: 'Resources'},
  {route: 'LandlordDocuments', label: 'Files'},
];

const Drawer = createDrawerNavigator();

const LandlordNavigator = () => {
  const [progress, setProgress] = React.useState();

  return (
    <DrawerProgressContext.Provider value={{progress, setProgress}}>
      <Drawer.Navigator
        drawerType="back"
        headerMode="none"
        initialRouteName="LandlordTabs"
        overlayColor="transparent"
        hideStatusBar={Platform.OS !== 'android'}
        drawerContent={props => <DrawerContent {...props} routes={routes} />}>
        <Drawer.Screen name="LandlordTabs" component={LandlordTabNavigator} />
        <Drawer.Screen
          name="LandlordProfile"
          component={LandlordProfileNavigator}
        />
      </Drawer.Navigator>
    </DrawerProgressContext.Provider>
  );
};

export default LandlordNavigator;
