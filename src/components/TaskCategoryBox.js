import React from 'react';
import Box from './Box';
import { TouchableOpacity, Dimensions } from 'react-native';
import useTheme from 'hooks/useTheme';
import Text from './Text';
import CategoryBox from './CategoryBox';

const w = Dimensions.get('window').width;

const TaskCategoryBox = ({ name, onPress, addButton, image, icon, styles, ...props }) => {
  const theme = useTheme();
  return (
    <CategoryBox
      styles={{ container: { width: "50%" } }}
      imageChildren={
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} width={"100%"} style={{ width: "100%" }} >
          <Box
            flexDirection={"row"}
            borderStyle={addButton ? 'dashed' : null}
            justifyContent="space-between"
            p={18}
            borderRadius={10}
            height={(w - 36) / 2}
            {...styles?.labelContainer}
          >
            <Text mt={"3px"} category="s2" style={{ textTransform: "uppercase" }} status="control" {...styles?.labelText}>
              {name}
            </Text>
            {icon}
          </Box>
        </TouchableOpacity>
      }
      image={require("img/task_category_bg.png")}
      {...props}
      {...styles}
    />
  );
};

export default TaskCategoryBox;
