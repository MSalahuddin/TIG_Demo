import BottomHalfModal from 'components/BottomHalfModal';
import Box from 'components/Box';
import React from 'react';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const offset = height > 800 ? 198 : 162;

const FullPageBottomModal = ({ children, ...props }) => {
    return (
        <BottomHalfModal {...props}>
            <Box height={height - offset}>
                {children}
            </Box>
        </BottomHalfModal>
    )
};

export default FullPageBottomModal