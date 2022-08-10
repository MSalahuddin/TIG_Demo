import React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const FocusedStatusBar = props => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};

FocusedStatusBar.propTypes = StatusBar.propTypes;

export default FocusedStatusBar;
