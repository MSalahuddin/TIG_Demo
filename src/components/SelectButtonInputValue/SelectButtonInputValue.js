import React from 'react';

import { style } from './styles.js'
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native';
import Box from 'components/Box.js';
import Text from 'components/Text.js';
import { t } from 'helpers/react.js';
import Icon from 'components/Icon.js';

const SelectButtonInputValue = ({ image, text, styles, imageRenderType = FastImage, onPress, children, icon, imageProps, iconPack = "pm" }) => {
    return (
        <Box as={onPress && TouchableOpacity} onPress={onPress} flexDirection='row' flexWrap='wrap' paddingBottom='5%' alignItems="center" style={styles?.container}>
            <Box height={"100%"} flexDirection='row' alignItems={"center"}>
                <Box style={styles?.imageContainer}>
                    <Box
                        justifyContent={"center"}
                        as={image && !icon && imageRenderType}
                        style={[style.image,  !image && !icon && style.placeholder, styles?.image,]}
                        source={{ uri: image }}
                        alignSelf={"center"}
                        uri={image}
                        {...imageProps}
                    >
                        {t(icon, Icon(icon, iconPack, { height: 24, width: 24 })())}
                    </Box>
                </Box>
                <Text style={[style.text, styles?.text]} numberOfLines={1} maxLength={8}>{text}</Text>
            </Box>
            {children}
        </Box>
    )
}

export default SelectButtonInputValue