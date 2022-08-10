import FullPageBottomModal from 'components/FullPageBottomModal';
import { chain } from 'helpers/func';
import React from 'react';
import { ScrollView } from 'react-native';

const FiltersModal = ({ visible, onHide, setFilter, children }) => {
    const onDone = chain([setFilter, onHide])
    return (
        <FullPageBottomModal title={"filters"} onHide={onDone} visible={visible}>
            <ScrollView>
                {children}
            </ScrollView>
        </FullPageBottomModal>
    )
};


export default FiltersModal;