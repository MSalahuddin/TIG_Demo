import React from 'react';
import { styles } from "./styles";
import Box from 'components/Box';
import { colors } from 'styles/theme';
import Header from 'components/Header';
import { USER_TYPES, stringifyEnumValue } from "../../constants/enums";
import FastImage from 'react-native-fast-image';
import Text from '../Text';

const ProfileHeadCard = ({
    actions,
    userName,
    userType,
    picture,
    children,
    ...props
}) => {
    return (
        <Box  backgroundColor={colors['gray scale/5']}  {...props}>
            <Header actions={actions} style={styles.header} />
            <Box style={styles.profileContainer}>
                <Box style={styles.profileImageBox}>
                    <FastImage source={picture ? { uri: picture || "" } : require('img/profile.svgpng')} resizeMode="cover" style={styles.profileImage} />
                </Box>
                <Text style={styles.profileName}>
                    {userName}
                </Text>
               {userType && <Text style={styles.profileType}>
                    {stringifyEnumValue(USER_TYPES, userType)}
                </Text>}
            </Box>
            {children}
        </Box>
    )
};

export default ProfileHeadCard