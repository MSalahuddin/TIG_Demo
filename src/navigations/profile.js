import React, { useContext } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import DrawerScreen from './DrawerScreen';
import EditProfile from 'pages/profile/EditProfile';
import CoorperateProfile from 'pages/profile/CoorperateProfile';
import AuthProvider from 'providers/auth';
import ViewProfile from 'pages/profile/ViewProfile';
import EditCoorperateProfile from 'pages/profile/CoorperateProfile/EditCoorperateProfile';

const Stack = createStackNavigator();
function ProfileNavigator(props) {
  const Container = props.navigation.openDrawer ? DrawerScreen : React.Fragment;
  const { user } = useContext(AuthProvider);
  const ProfileComponent = user?.userType != 1 ? CoorperateProfile : ViewProfile;
  const EditProfileComponent = user?.userType != 1 ? EditCoorperateProfile : EditProfile;
  return (
    <Container>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="ViewProfile"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="ViewProfile" >
          {props => <ProfileComponent userId={user?.id} isSelf={true} userType={user?.userType} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="EditProfile" >
          {props => <EditProfileComponent userId={user?.id} userType={user?.userType} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ViewCoorperateProfile" >
          {props => <CoorperateProfile userType={props?.route?.params?.userType} userId={props?.route?.params?.id} isSelf={false} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Container>
  );
}

export default ProfileNavigator;
