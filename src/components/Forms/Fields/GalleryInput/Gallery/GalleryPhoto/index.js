import React from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import { deleteBtnProps } from 'components/Forms/Fields/ButtonField';
import { ImageBackground } from 'react-native';
import { t } from 'helpers/react';

const GalleryPhoto = ({ img, onDelete }) => {
    return (
        <Box
            as={ImageBackground}
            source={img}
            style={styles.container}
            position="relative"
            borderRadius={18}
            overflow={"hidden"}
            mx={"7px"}
        >
            {t(onDelete,
                <Button
                    {...deleteBtnProps}
                    onPress={() => onDelete(img)}
                    style={{
                        ...deleteBtnProps.style,
                        ...styles.del
                    }}
                />)}
        </Box>
    )
};

const styles = {
    container: {
        height: 162,
        width: 162
    },
    del: {
        position: "absolute",
        top: 12,
        right: 3,
        height: 16,
        width: 16
    }
}


export default GalleryPhoto;