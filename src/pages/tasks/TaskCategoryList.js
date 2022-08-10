import React from 'react';
import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import TaskCategoryBox from 'components/TaskCategoryBox';
import useAuth from 'hooks/useAuth';
import { FlatList } from 'react-native-gesture-handler';
import { TASK_LIST_CATEGORIES } from './consts';
import { Image } from 'react-native';

const categories = TASK_LIST_CATEGORIES;

const TaskCategoryList = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <Box flex={1} as={Layout} p="2">
      <FlatList
        data={categories}
        dataExtractor={item => item}
        numColumns={2}
        renderItem={
          ({item: { name, filterField, categoryName = name}}) =>  
            <TaskCategoryBox
              name={name}
              icon={<Image source={require("img/icons/tasks-active.png")} height={18} width={18} />}
              onPress={() => navigation.navigate('ListTasks', { categoryName, categoryFilter: filterField && { [filterField]: user.id } })}
            />
        }
      />
    </Box>
  );
};

export default TaskCategoryList;
