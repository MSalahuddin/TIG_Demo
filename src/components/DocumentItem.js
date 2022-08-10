import React from 'react';
import Box from './Box';
import Text from './Text';
import { DOCUMENT_TYPE } from 'constants/enums';
import useTheme from 'hooks/useTheme';
import { TouchableOpacity } from 'react-native';
import Button from 'components/Button';
import Icon from './Icon';

const DocumentItem = ({ name, type, value = "", rightIcon = "humburger-menu", onPress, onMore, ...props }) => {
  const theme = useTheme();

  return (
    <Box
      as={TouchableOpacity}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      my={3}
      onPress={onPress}
      {...props}>
      <Box
        as={Button}
        appearance="ghost"
        py="0px"
        px={2}
        icon={style => Icon(type === DOCUMENT_TYPE.FOLDER ? 'folder-transparent' : 'document_icon', 'pm')({
          flex: 0.09,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          width: "100%",
          height: 40,
        })}
        style={{ marginRight: 10 }}
      />
      <Text category={"s4"} transform="uppercase" flex={2} pt="1" style={{
        fontSize: 14,
        fontWeight: "400",
      }}>
        {name}
      </Text>
      <Box
        as={TouchableOpacity}
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onMore}
        flex={3}
      >
        <Text
          category="p2"
          status={onPress ? 'primary' : 'basic'}
          textAlign="right"
          style={{
            fontSize: 14,
            fontWeight: "400",
          }}>
          {value}
        </Text>
      </Box>
      <Box
        as={Button}
        appearance="ghost"
        py="0px"
        px="0px"
        style={{ width: 30, height: 49, marginRight: 10 }}
        icon={style => Icon(rightIcon, 'pm')({ ...style, width: 20, height: 20, })}
        onPress={onMore}
      />
    </Box>
  );
};

export default DocumentItem;
