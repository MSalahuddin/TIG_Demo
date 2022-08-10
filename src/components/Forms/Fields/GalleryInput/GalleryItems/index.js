import React from 'react';
import useTheme from 'hooks/useTheme';
import FastImage from 'react-native-fast-image';

import { ScrollView, Linking } from 'react-native';
import Box from 'components/Box';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Button from 'components/Button';
import { styles } from "./styles"

const GalleryItem = ({ isImage, file, ext, theme }) => {
    if (isImage) {
        return (
            <Box
                as={FastImage}
                borderRadius={10}
                overflow="hidden"
                source={file}
                {...styles.file(theme)}
            />
        );
    }
    return (
        <Box
            alignItems="center"
            {...styles.file(theme)}
            justifyContent="center">
            <Text status="control" category="p2" {...styles.fileText}>
                {ext.toUpperCase()}
            </Text>
        </Box>
    );
}

const GalleryItems = ({ value, disabled, readOnly, download, onRemove }) => {
    const theme = useTheme()
    const renderFile = React.useCallback(
        file => {
            let isImage = false;
            let ext = 'file';
            if (typeof file === 'number' || !file.type) {
                isImage = true;
            } else {
                if (file.name) {
                    ext = `${file.name}`.substr(
                        `${file.name}`.lastIndexOf('.') === -1
                            ? `${file.name}`.length
                            : `${file.name}`.lastIndexOf('.') + 1,
                    );
                } else {
                    ext = `${file.uri}`.substr(
                        `${file.uri}`.lastIndexOf('.') === -1
                            ? `${file.uri}`.length
                            : `${file.uri}`.lastIndexOf('.') + 1,
                    );
                }
                const [_, mime, type] = /(.*)\/(.*)/g.exec(file.type) || [];
                isImage =
                    isImage ||
                    ['png', 'jpeg', 'jpg', 'gif'].indexOf(type) !== -1 ||
                    mime === 'image';
                ext = ext || type;
            }
            return <GalleryItem file={file} ext={ext} theme={theme} isImage={isImage} />

        },
        [theme],
    );
    return (
        <ScrollView horizontal>
            <Box my={2} flexDirection="row" >
                {value &&
                    Array.isArray(value) &&
                    value.map((img, index) => (
                        <Box mr="10px" >
                            {!readOnly && !disabled ? (
                                <Box style={styles.deleteIconContainer} >
                                    <Button
                                        as={TouchableOpacity}
                                        status="danger"
                                        shape="circle"
                                        {...styles.deleteBtn}
                                        onPress={() => onRemove(index)}
                                        icon={style => Icon('minus')({ ...style, ...styles.deleteIcon })}
                                    />
                                </Box>
                            ) : null}
                            <Box position="relative" key={index} {...styles.fileWrapper}>
                                <TouchableOpacity
                                    overflow={"hidden"}
                                    borderRadius={18}
                                    activeOpacity={download ? 0.65 : 1}
                                    onPress={download ? () => Linking.openURL(img?.uri) : null}>
                                    {renderFile(img)}
                                </TouchableOpacity>
                            </Box>
                        </Box>

                    ))}
            </Box>
        </ScrollView>
    )
}
export default GalleryItems