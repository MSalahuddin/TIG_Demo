import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import ResetPasswordChange from 'pages/auth/ResetPasswordChange';
import ResetPasswordEmail from 'pages/auth/ResetPasswordEmail';

const Stack = createStackNavigator();

function ResetPasswordNavigator(props) {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ResetPasswordEmail"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen component={ResetPasswordEmail} name="ResetPasswordEmail" />
      <Stack.Screen
        component={ResetPasswordChange}
        name="ResetPasswordChange"
      />
    </Stack.Navigator>
  );
}

export default ResetPasswordNavigator;
