import React, { useCallback, useEffect } from 'react';
import listDocumentsQuery from 'queries/documents/listDocuments.gql';
import Text from 'components/Text';


const MyFilesInput = ({ navigation, visible = true }) => {

    const handleDisplay = useCallback(() => {
        navigation.navigate('GenericSelectScreen', {
            header: "My Files",
            query: listDocumentsQuery,
            renderItem: ({ item }) => item,
            dataExtractor: data => data.documents,
            keyExtractor: item => item.id,
            ListEmptyComponent: (
                <Text category="h6" py={3} textAlign="center" appearance="hint">
                    No Files
                </Text>)

        })
    })

    useEffect(() => visible && handleDisplay(), [visible])
    return <></>
};

export default MyFilesInput;