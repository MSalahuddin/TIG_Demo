import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import TaskCategoryList from 'pages/tasks/TaskCategoryList';
import TaskList from 'pages/tasks/TaskList';
import Box from 'components/Box';
import {Layout} from '@ui-kitten/components';

const Stack = createStackNavigator();

const TaskListRoot = props => {
  return (
    <Box flex={1} as={Layout}>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="ListCategories"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="ListCategories" component={TaskCategoryList} />
        <Stack.Screen name="ListTasks" component={TaskList} />
      </Stack.Navigator>
    </Box>
  );
};

export default TaskListRoot;
