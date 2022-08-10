import styled from 'styled-components/native';
import SelectInputForward from 'components/SelectInput';
import { ScrollView } from 'react-native';
import { IS_SMALLER } from 'styles/responsive';
import InputLabel from 'components/InputLabel';
import React from "react";

export const TaskInput = styled(Input).attrs(({ theme, category, textStyle }) => ({
  textStyle: {
    color: theme['grey-100'],
    paddingVertical: Platform.OS === 'ios' ? 6 : 0,
    marginTop: Platform.OS !== 'ios' ? 10 : 0,
    fontSize: 14,
    marginTop: 0,
    ...(category
      ? {
        fontSize: theme[`text-${category}-font-size`],
        fontWeight: theme[`text-${category}-font-weight`],
        fontFamily: theme[`text-${category}-font-family`],
      }
      : {}),
    ...textStyle,
    alignSelf: "flex-end"
  },
  padding: 0,
  margin: 0,
  height: 36,
  marginTop: -2,
  paddingBottom: 0,
  marginLeft: 0,
  captionStyle: {
    paddingHorizontal: 16,
  },
  selectionColor: theme['color-primary-500'],
}))`  
    background-color: transparent;
  `;

export const TaskTitleInput = styled(TaskInput).attrs(({ theme, category }) => ({
  textStyle: {
    paddingVertical: 0,
    marginVertical: 0,
    ...category && ({
      fontSize: theme[`text-${category}-font-size`],
      fontWeight: "bold",
      fontFamily: theme[`text-${category}-font-family`],
    }),
    paddingLeft: 7
  },
  placeholderTextColor: theme['color-secondary2-default'],

  width: "100%",
  height: 36,
  justifyContent: "center",
  paddingTop: 0,
  marginTop: -1,

}))`
    background-color: transparent;
  `;

export const TaskSelectInput = styled(SelectInputForward).attrs(
  ({ theme, touched, disabled }) => ({
    textStyle: {
      color: theme['grey-400'],
      paddingVertical: 8,
      borderBottomWidth: 2,
      borderBottomColor:
        touched && !disabled ? theme['color-primary-500'] : theme['grey-100'],
    },
    captionStyle: {
      paddingHorizontal: 16,
    },
    icon: disabled ? null : 'arrow-ios-downward',
  }),
)`
  background-color: transparent;
`;

import { Input } from '@ui-kitten/components';
export const styles = {
  multiselect: {
    container: {mt: 1},
    label: {marginLeft:"5%", maxWidth: "90%", marginTop: 3},
    optionsContainer: IS_SMALLER ? {
      as: ScrollView, horizontal: true, marginTop: 2, alignItems: undefined, justifyContent: undefined, maxHeight: 54, paddingLeft: 2, contentContainerStyle: { justifyContent: "space-between" }
    } : { marginTop: 2, paddingHorizontal: "3%" }
  }
}
export const FieldLabel = ({children, ...props}) => <InputLabel label={children} {...props} />
