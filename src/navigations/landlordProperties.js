import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import PropertiesList from 'pages/properties/PropertiesList';
import ViewUnit from 'pages/properties/ViewUnit';
import ViewProperty from 'pages/properties/ViewProperty/ViewProperty';

const Stack = createStackNavigator();

function LandlordPropertiesStackNavigator(props) {

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ListProperties"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen name="ListProperties" component={PropertiesList} />
      <Stack.Screen name="ViewProperty" component={ViewProperty} />
      <Stack.Screen name="ViewUnit" component={ViewUnit} />
    </Stack.Navigator>
  );
}

export default LandlordPropertiesStackNavigator;
