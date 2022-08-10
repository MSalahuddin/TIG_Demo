import BottomHalfModal from 'components/BottomHalfModal';
import Box from 'components/Box';
import React from 'react';
import Text from 'components/Text';
import FileInput from 'components/Forms/Fields/FileInput';
import { TouchableOpacity } from 'react-native';
import { Icon } from "@ui-kitten/components";
import { styles } from './styles';
import { useIsOpen } from 'hooks/useIsOpen';
import { t } from 'helpers/react';
import { noop } from 'lodash';

export const ModalOption = ({ iconProps, text, onPress, inactive }) => {
    return (
        <Box as={TouchableOpacity} onPress={!inactive ? onPress: noop} style={styles.touchableContainer}>
            <Icon height={18} width={18} {...iconProps} />
            <Text style={styles.text}>{text}</Text>
            {t(inactive, <Box width={"100%"} height={"100%"} position={"absolute"} backgroundColor={"#fff"} opacity={0.5} />)}
        </Box>
    )
}

const AttachmentModal = ({ setValue, value, ...props }) => {
    const { isOpen, close, open } = useIsOpen();

    const handleSetValue = (val) => !val?.[0]?.didCancel && setValue([...(value || []), ...val])

    return (
        <BottomHalfModal {...props}>
            <Box>
                <ModalOption onPress={open} text={"Choose External File"} iconProps={{ name: 'document', pack: "pm",}} />
                <ModalOption text={"Choose File from App"} iconProps={{ name: 'fileFromApp', pack: "pm",}} />
            </Box>
            <FileInput displayPicker={isOpen} onSubmit={handleSetValue} close={close} />
        </BottomHalfModal>
    )
};

export default AttachmentModal