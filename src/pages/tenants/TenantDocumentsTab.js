import React from 'react';
import Box from 'components/Box';

import { Layout } from '@ui-kitten/components';
import listLeaseDocumentsQuery from 'queries/tenants/listLeaseDocuments.gql';
import uploadLeaseDocumentMutation from 'queries/tenants/uploadLeaseDocument.gql';
import ObjectDocumentList from 'components/ObjectDocumentList';
import { useIsFocused } from '@react-navigation/native';
import SubmitButton from 'components/SubmitButton';
import { useMutation } from 'urql';
import DocumentPicker from 'react-native-document-picker';
import { ReactNativeFile } from 'extract-files';
import Dialog from 'components/Dialog';

const TenantDocumentsTab = ({ route, ...props }) => {
  const [error, setError] = React.useState(null);
  const listProps = React.useMemo(
    () => ({
      variables: {
        id: props?.userId,
      },
      query: listLeaseDocumentsQuery,
      dataExtractor: data => data?.lease?.documents,
    }),
    [route],
  );
  const listRef = React.useRef();

  const [uploadRes, uploadDocument] = useMutation(uploadLeaseDocumentMutation);

  const onUpload = React.useCallback(() => {
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
      const res = await uploadDocument({
        id: props?.userId,
        document: new ReactNativeFile({
          uri: file.uri,
          type: file.type,
          name: file.name,
        }),
      });
      if (res.data?.uploadLeaseDocument?.document) {
        listRef.current?.refresh?.();
      } else {
        setError(
          (res.error?.message || '').replace(
            /\[(Network Error|GraphQL)\]\s*/g,
            '',
          ),
        );
      }
    };
    upload();
  }, [route, uploadDocument]);

  const isFocused = useIsFocused();

  return (
    <Box as={Layout} flex={1} pb="3" px="3" height={isFocused ? null : 0}>
      <Box flex={3} >
        <ObjectDocumentList
          {...listProps}
          ref={listRef}
          contentContainerStyle={{ paddingBottom: 60 }}
        />

      </Box>
      <Box flex={1}>
        <SubmitButton
          size="giant"
          loading={uploadRes.fetching}
          onPress={onUpload}>
          Upload a Document
        </SubmitButton>
      </Box>
      <Dialog
        visible={!!error}
        onHide={() => setError(null)}
        title="Failed to upload document."
        content={error}
        buttons={[
          {
            children: 'OK',
            gradient: true,
            shape: 'circle',
            hide: true,
          },
        ]}
      />
    </Box>
  );
};

export default TenantDocumentsTab;
