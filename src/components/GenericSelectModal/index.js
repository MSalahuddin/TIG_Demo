import FullPageBottomModal from 'components/FullPageBottomModal';
import GenericSelectList from 'pages/GenericSelectScreen/GenericSelectList';
import React, { useCallback, useState } from 'react';

const GenericSelectModal = ({ visible, onHide, onSelect, header, headerRight, titleAppender, ...genericSelectProps }) => {
    const [selectedValues, setSelectedValues] = useState({});

    const onDone = useCallback(() => {
        onSelect?.(Object.values(selectedValues));
        onHide();
    }, [selectedValues]);
        
    return (
        <FullPageBottomModal title={header} titleAppender={titleAppender} visible={visible} headerRight={headerRight} onHide={onDone} >
            <GenericSelectList
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                {...genericSelectProps}
            />
        </FullPageBottomModal>
    )
};


export default GenericSelectModal;