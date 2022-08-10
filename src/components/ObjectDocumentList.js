import React from 'react';
import {Layout} from '@ui-kitten/components';
import Box from './Box';
import {Linking} from 'react-native';
import InfiniteFlatList from './InfiniteFlatList';
import renameDocumentMutation from 'queries/documents/renameDocument.gql';
import removeDocumentMutation from 'queries/documents/removeDocument.gql';
import {useMutation} from 'urql';
import Text from './Text';
import DocumentItem from './DocumentItem';
import {DOCUMENT_TYPE} from 'constants/enums';
import Dialog from './Dialog';
import Input from './Input';
import OptionsModal from './OptionsModal';
import {useFocusEffect} from '@react-navigation/native';
import useShareRemoteFile from 'hooks/useShareRemoteFile';

let ObjectDocumentList = (props, ref) => {
  const [showNameDialog, setShowNameDialog] = React.useState(false);
  const [dialogError, setDialogError] = React.useState(null);
  const [newName, setNewName] = React.useState('');
  const [moreDialog, setMoreDialog] = React.useState(null);
  const shareRemoteFile = useShareRemoteFile();
  const backupRef = React.useRef();
  const listRef = ref || backupRef;

  React.useEffect(() => {
    if (showNameDialog?.type !== 'move') {
      setNewName(showNameDialog?.name ?? '');
    } else {
      setNewName(null);
    }
    setDialogError(null);
  }, [showNameDialog]);

  const [renameDocumentRes, renameDocument] = useMutation(
    renameDocumentMutation,
  );
  const [removeDocumentRes, removeDocument] = useMutation(
    removeDocumentMutation,
  );

  const onRefresh = React.useCallback(() => {
    listRef.current?.refresh?.();
  }, [listRef]);

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onOpenFile = React.useCallback(item => {
    Linking.openURL(item.url);
  }, []);

  const onNameDialogSubmit = React.useCallback(() => {
    const submit = async () => {
      let success = true;
      const setError = error => {
        setDialogError(
          (error?.message || '').replace(/\[(Network Error|GraphQL)\]\s*/g, ''),
        );
        success = false;
      };
      if (showNameDialog?.type === 'rename') {
        const res = await renameDocument({
          id: showNameDialog?.id,
          name: newName,
        });
        if (res.data?.renameDocument?.document?.id) {
          onRefresh();
        } else {
          setError(res.error);
        }
      } else if (showNameDialog?.type === 'remove') {
        const res = await removeDocument({
          id: showNameDialog?.id,
          ignoreFullFolder: dialogError === 'Folder contains items',
        });
        if (res.data?.removeDocument?.success) {
          onRefresh();
        } else {
          setError(res.error);
        }
      }
      if (success) {
        setShowNameDialog(null);
      }
    };
    submit();
  }, [
    dialogError,
    newName,
    onRefresh,
    removeDocument,
    renameDocument,
    showNameDialog,
  ]);

  const onShare = React.useCallback(
    file => {
      const share = async () => {
        const shareResp = await shareRemoteFile(file.url);
        // console.log(shareResp);
      };
      share();
    },
    [shareRemoteFile],
  );

  const dialogObjectName =
    showNameDialog?.itemType === DOCUMENT_TYPE.FOLDER ? 'Folder' : 'Document';

  const moreOptions = React.useMemo(() => {
    return [
      {
        label: 'Open',
        onPress: () => {
          onOpenFile(moreDialog);
          setMoreDialog(false);
        },
      },
      {
        label: 'Share',
        onPress: () => onShare(moreDialog),
      },
      {
        label: 'Send via DocuSign',
      },
      {
        label: 'Rename',
        onPress: () => {
          const item = {...moreDialog};
          setMoreDialog(false);
          setTimeout(() => setShowNameDialog({...item, type: 'rename'}), 500);
        },
      },
      {
        label: 'Remove',
        onPress: () => {
          const item = {...moreDialog};
          setMoreDialog(false);
          setTimeout(() => setShowNameDialog({...item, type: 'remove'}), 500);
        },
      },
    ].filter(o => !!o);
  }, [moreDialog, onOpenFile, onShare]);

  return (
    <Box as={Layout} flex={1} position="relative">
      <InfiniteFlatList
        ref={listRef}
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Files
          </Text>
        }
        dataExtractor={data => data.documents}
        keyExtractor={item => item.id}
        refresh
        renderItem={({item}) => (
          <DocumentItem
            name={item.name}
            type={item.itemType}
            onMore={() => setMoreDialog(item)}
            onPress={() => onOpenFile(item)}
          />
        )}
        {...props}
      />
      <Dialog
        visible={!!showNameDialog}
        onHide={() => setShowNameDialog(false)}
        title={
          showNameDialog?.type === 'rename'
            ? `Rename ${dialogObjectName}`
            : `Remove ${dialogObjectName}`
        }
        buttons={[
          {
            shape: 'circle',
            gradient: true,
            children: showNameDialog?.type === 'remove' ? 'Remove' : 'Save',
            disabled:
              (!newName?.length &&
                (showNameDialog?.type === 'create' ||
                  showNameDialog?.type === 'rename')) ||
              renameDocumentRes.fetching ||
              removeDocumentRes.fetching,
            onPress: onNameDialogSubmit,
          },
        ]}>
        {dialogError ? (
          <Text status="danger" category="c1" mb="2">
            {dialogError}
            {dialogError === 'Folder contains items'
              ? '.\nEnsure you want to remove the folder and all of its content, and press Remove again.'
              : null}
          </Text>
        ) : null}
        {showNameDialog?.type === 'remove' ? (
          <Text>
            This {dialogObjectName.toLowerCase()} will be removed from the
            system.
          </Text>
        ) : (
          <Input
            placeholder="Enter Name"
            value={newName}
            onChangeText={setNewName}
            textStyle={{width: 200}}
            autoFocus
            selectTextOnFocus
            onSubmitEditing={newName?.length ? onNameDialogSubmit : null}
          />
        )}
      </Dialog>
      <OptionsModal
        visible={!!moreDialog}
        onHide={() => setMoreDialog(null)}
        options={moreOptions}
      />
    </Box>
  );
};

ObjectDocumentList = React.forwardRef(ObjectDocumentList);

export default ObjectDocumentList;
