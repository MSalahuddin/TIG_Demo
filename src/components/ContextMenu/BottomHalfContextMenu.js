import React from "react";

import { chain } from 'helpers/func';
import BottomHalfModal from "components/BottomHalfModal";
import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Text from 'components/Text';
import Box from 'components/Box';
import Icon from 'components/Icon';
import { t } from 'helpers/react';

const BottomHalfContextMenu = ({ onHide, menuItems = [], title = "Actions", ...props }) => {
    const microcopy = { title };

    return (
        <>
            <BottomHalfModal
                displayDone={false}
                onHide={onHide}
                styles={{ headerTxt: styles.headerTxt }}
                {...microcopy}
                {...props}
            >
                {menuItems.map(({ key, onPress, label, color, icon }) => {
                    return (
                        t(key, <Box as={TouchableOpacity} onPress={chain([onPress, onHide])} style={styles.touchableContainer}>
                            {t(icon, Icon(icon, 'pm')({ ...styles.iconStyle, fill: color }))}
                            <Text style={{ ...styles.text, color }}>{label}</Text>
                        </Box>)
                    )
                })}
            </BottomHalfModal>
        </>
    )
}
export default BottomHalfContextMenu