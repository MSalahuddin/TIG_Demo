import React from 'react';
import { Dimensions } from 'react-native';
import { ReactNativeFile } from 'extract-files';
import DocumentPicker from 'react-native-document-picker';
import { useMutation } from 'urql';
import Box from 'components/Box';
import Button from 'components/Button';
import Icon from 'components/Icon';
import listDocumentsQuery from 'queries/documents/listDocuments.gql';
import ObjectDocumentList from 'components/ObjectDocumentList';
import uploadDocumentMutation from 'queries/documents/uploadDocument.gql';
import { button_styles } from 'styles/button';

const maxHeight = Math.max(0, Dimensions.get('window').height * 0.4);
const Files = ({ data, userId }) => {
    const listRef = React.useRef();
    const [uploadDocumentRes, uploadDocument] = useMutation(uploadDocumentMutation);
    const listProps = React.useMemo(
        () => ({
            variables: {userId: data?.pk},
            query: listDocumentsQuery,
            dataExtractor: data => data?.documents,
            pause: !userId
        }),
        [data],
    );

    const onUploadFile = React.useCallback(() => {
        const upload = async () => {
            let file;
            try {
                file = await DocumentPicker.pick({
                    type: DocumentPicker.types.pdf,
                });
            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    console.log('canceled');
                } else {
                    console.log(err);
                }
            }
            if (!file) {
                return;
            }
            const rnFile = new ReactNativeFile({
                ...file,
                uri:
                    Platform.OS === 'android'
                        ? file.uri
                        : file.uri.replace('file://', ''),
            });
            const res = await uploadDocument({document: rnFile});
            if (res.data?.uploadDocument?.document?.id) {
                setShowAddModal(false);
            } else {
                setDialogError(
                    (res.error?.message || '').replace(
                        /\[(Network Error|GraphQL)\]\s*/g,
                        '',
                    ),
                );
            }
        };
        upload();
    }, [uploadDocument]);

    return (
        <>
            <Box minHeight={Dimensions.get('window').height - maxHeight}>
                <ObjectDocumentList
                    {...listProps}
                    ref={listRef}
                    contentContainerStyle={{ paddingBottom: 60 }}
                />
            </Box>
            <Button
                icon={Icon('plus')}
                children={"Add"}
                onPress={onUploadFile}
                style={{...button_styles["primary"], borderRadius: 0}}
            />
        </>
    )
};

export default Files;