import React, { useMemo, } from 'react';
import { useQuery } from 'urql';
import ProfilePage from 'components/ProfilePage';
import { getActions } from 'constants/actions';
import { tabs, steps, getUserProfileQuery } from "./schema";

const CoorperateProfile = ({ navigation, userId, userType, isSelf }) => {

    const [profileRes, fetchProfile] = useQuery({
        query: getUserProfileQuery(userType),
        pause: !userId,
        variables: { id: userId },
        requestPolicy: "network-only"
    });

    const actions = useMemo(() => getActions(
        ['back', { onPress: () => navigation?.goBack() }],
        ["editIcon", { onPress: () => navigation.navigate('EditProfile', {onUpdate: () => fetchProfile()}), disable: true, height: 21, width: 21, marginTop: 3 }]
    ), [navigation]);


    return (
        <ProfilePage
            user={profileRes?.data?.user}
            userId={userId}
            fetching={profileRes?.fetching}
            navigation={navigation}
            actions={actions}
            userType={userType}
            tabs={tabs}
            steps={steps}
            isSelf={isSelf}
        />
    );
};

export default CoorperateProfile;
