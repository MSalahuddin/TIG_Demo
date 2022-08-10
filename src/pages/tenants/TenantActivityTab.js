import React from 'react';
import { Dimensions } from "react-native";
import ActivityTab from "components/ProfilePage/ActivityTab"

const { height } = Dimensions.get("window")
const TenantActivityTab = ({ ...data }) => {
  return <ActivityTab keyboardPadding={false} feedId={data?.activityFeed?.pk}  styles={{container:{ paddingBottom: 36, maxHeight: height / 2}}} />
};

export default TenantActivityTab;
