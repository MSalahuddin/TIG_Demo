import React from 'react';
import { Dimensions } from "react-native";
import ActivityTab from "components/ProfilePage/ActivityTab";

const { height } = Dimensions.get("window");
const Activity = ({ data }) => {
    return (
            <ActivityTab
                listProps={{ variables: { user: data?.pk } }}
                feedId={null}
                styles={{ container: { paddingBottom: 36, maxHeight: height / 1.4, minHeight: height / 2 } }}
                comments={false}
            />
    )
};

export default Activity;