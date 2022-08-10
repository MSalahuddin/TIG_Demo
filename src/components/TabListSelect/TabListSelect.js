import { noop } from "lodash";
import React from "react";
import { View } from "react-native";
import TabListButton from "./TabListButton";


 const TabListSelect =({ values, onPress = noop, isRadio, currentSelectedItem, flexDirection, buttonWidth})=> {
    const _renderRadioButtons = () => {
        return (values || []).map((selectedItem, i) => {
            let isChecked = currentSelectedItem && (currentSelectedItem?.value === selectedItem?.value);

            return (
                <TabListButton
                    buttonWidth={buttonWidth}
                    key={i}
                    onButtonPress={() => onPress(selectedItem)}
                    isChecked={isChecked}
                    isRadio={isRadio}
                    icon = {selectedItem.icon}
                    text={selectedItem.text}
                />
            );
        });
    };

    return <View 
            flexDirection={flexDirection} 
            style={{flexWrap:'wrap',
                    width: '100%',
                    justifyContent: 'space-evenly',
            }}>
              {_renderRadioButtons()}
            </View>;
}


export default TabListSelect