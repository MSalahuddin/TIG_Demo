import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Layout } from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import ProfileHeadCard from '../ProfileHeadCard';
import MultiTextSwitch from '../MultiTextSwitch';
import Box from '../Box';
import { styles } from "./styles";
import { useLoader } from 'hooks/useLoader';
import { IS_SMALLER } from 'styles/responsive';

const maxHeight = Math.max(0, Dimensions.get('window').height * (IS_SMALLER ? 0.54 : 0.72));
const defaultFlexSize = IS_SMALLER ? 2.5 : 4
const ProfilePage = ({ fetching, navigation, actions, userType, tabs, steps, user, flexSize = defaultFlexSize, extraHeaderContent, ...props }) => {
    const theme = useTheme();
    const [feedIndex, setFeedIndex] = useState(0);
    const StepComponent = steps[feedIndex];
    const { loader } = useLoader({ isLoading: fetching });
    const renderHeader = React.useCallback(
        () => (
            <ProfileHeadCard actions={actions} userName={user?.fullName} userType={userType} picture={user?.picture}>
                <Box style={{ ...styles.headContainer }}>
                    {extraHeaderContent && extraHeaderContent()}
                    <Box style={{ marginBottom: IS_SMALLER ? 10 : 15, }} mt={IS_SMALLER ? 2 : 3} px={18} >
                        <MultiTextSwitch
                            value={feedIndex}
                            shape="circle"
                            size="small"
                            options={tabs}
                            onSelect={(_, i) => setFeedIndex(i)}
                        />
                    </Box>
                </Box>
            </ProfileHeadCard>
        ),
        [actions, theme, fetching, tabs, user, feedIndex],
    );

    const renderContent = React.useCallback(
        () => (
            <StepComponent navigation={navigation} data={user} {...props} onSwitchToTab = {(i)=> {setFeedIndex(i)}}/>
        ),
        [feedIndex, theme, fetching]
    );
    return (
        <Box flex={1} alignContent={"space-between"} style={styles.container} as={Layout}>
            {loader}
            {renderHeader()}
            <Box flex={flexSize} height={maxHeight} mt={3} >
                {renderContent()}
            </Box>
        </Box>
    )
};

export default ProfilePage;