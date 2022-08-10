import React from 'react';
import ActivityFeed from 'components/ActivityFeed';
import WhiteCard from 'components/WhiteCard';

const ActivityTab = ({ feedId, keyboardPadding = true, ...props }) => {
    return (
        <WhiteCard >
            <ActivityFeed feedId={feedId} keyboardPadding={keyboardPadding} {...props} />
        </WhiteCard>
    )
};

export default ActivityTab;