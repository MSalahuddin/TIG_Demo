import React from 'react';
import { Layout } from '@ui-kitten/components';

import Box from './Box';
import { TouchableOpacity } from 'react-native';
import SelectButtonInputValue from './SelectButtonInputValue/SelectButtonInputValue';
const defaultStyles = {
  image: { borderRadius: 50 / 2 },
  text: { marginLeft: 10 },
  container: {
    width: "100%", height: "100%", justifyContent: "space-between", alignItems: "center", paddingVertical: "3%",
  }
};

export const UserValue = ({ name, picture, userStyles, ...props }) => <SelectButtonInputValue text={name} image={picture} styles={userStyles} {...props} />

const Persona = ({
  profile,
  name,
  title,
  children,
  styles,
  onPress,
  ...props
}) => {
  const userStyles = { ...defaultStyles, ...styles, container: { ...defaultStyles.container, ...styles?.innerContainer } }
  return (
    <Box
      as={onPress ? TouchableOpacity : Layout}
      px="3"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      onPress={onPress}
      borderRadius={10}
      {...styles?.container}
      {...props}>
      <UserValue name={name} picture={profile} imageProps={!profile && { source: require('img/profile.svgpng') }} children={children} userStyles={userStyles} />
    </Box>
  );
};

export default Persona;
