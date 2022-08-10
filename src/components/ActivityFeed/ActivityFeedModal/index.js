import FullPageBottomModal from 'components/FullPageBottomModal';
import React  from 'react';
import ActivityFeed from '../index';


const ActivityFeedModal = ({modalProps, ...props}) => {
    return (
        <FullPageBottomModal title={"Activity"} {...modalProps}>
            <ActivityFeed onLinkPress={modalProps?.onHide} {...props} />
        </FullPageBottomModal>
    )
};

export default ActivityFeedModal;