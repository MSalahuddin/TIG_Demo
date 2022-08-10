import React from 'react';
import { Layout, Spinner } from '@ui-kitten/components';
import Box from './Box';
import Icon from './Icon';
import { FlatList, Linking, Platform } from 'react-native';
import InfiniteFlatList from './InfiniteFlatList';
import getDocumentTypesQuery from 'queries/documents/getDocumentTypes.gql';
import listDocumentsQuery from 'queries/documents/listDocuments.gql';
import listFoldersQuery from 'queries/documents/listFolders.gql';
import listDocumentTemplatesQuery from 'queries/documents/listDocumentTemplates.gql';
import renameDocumentMutation from 'queries/documents/renameDocument.gql';
import removeDocumentMutation from 'queries/documents/removeDocument.gql';
import moveDocumentMutation from 'queries/documents/moveDocument.gql';
import createFolderMutation from 'queries/documents/createFolder.gql';
import uploadDocumentMutation from 'queries/documents/uploadDocument.gql';
import { useQuery, useMutation } from 'urql';
import Text from './Text';
import DocumentItem from './DocumentItem';
import { DOCUMENT_TYPE } from 'constants/enums';
import { useRoute, useNavigation } from '@react-navigation/native';
import BottomHalfModal from './BottomHalfModal';
import useTheme from 'hooks/useTheme';
import Dialog from './Dialog';
import Input from './Input';
import OptionsModal from './OptionsModal';
import useFab from 'hooks/useFab';
import { useFocusEffect } from '@react-navigation/native';
import SelectInputForward from './SelectInput';
import DocumentPicker from 'react-native-document-picker';
import { ReactNativeFile } from 'extract-files';
import useShareRemoteFile from 'hooks/useShareRemoteFile';
import BottomHalfContextMenu from 'components/ContextMenu/BottomHalfContextMenu';
import { colors } from 'styles/theme';

const DocumentList = ({ search }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const fabContext = useFab();
  const type = route.params?.type;
  const canAdd = type !== 'templates' && !search?.length;
  const parentFolder = route.params?.folderId;
  const theme = useTheme();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showNameDialog, setShowNameDialog] = React.useState(false);
  const [dialogError, setDialogError] = React.useState(null);
  const [newName, setNewName] = React.useState('');
  const [moreDialog, setMoreDialog] = React.useState(null);
  const shareRemoteFile = useShareRemoteFile();
  const listRef = React.useRef();

  React.useEffect(() => {
    if (showNameDialog?.type !== 'move') {
      setNewName(showNameDialog?.name ?? '');
    } else {
      setNewName(null);
    }
    setDialogError(null);
  }, [showNameDialog, showAddModal]);

  const [listFoldersRes, listFolders] = useQuery({
    query: listFoldersQuery,
  });
  const [docTypesRes] = useQuery({
    query: getDocumentTypesQuery,
    pause: type !== 'templates' || parentFolder,
  });
  const [createFolderRes, createFolder] = useMutation(createFolderMutation);
  const [uploadDocumentRes, uploadDocument] = useMutation(
    uploadDocumentMutation,
  );
  const [renameDocumentRes, renameDocument] = useMutation(
    renameDocumentMutation,
  );
  const [removeDocumentRes, removeDocument] = useMutation(
    removeDocumentMutation,
  );
  const [moveDocumentRes, moveDocument] = useMutation(moveDocumentMutation);

  const onRefresh = React.useCallback(
    (recursive = false) => {
      listRef.current?.refresh?.();
      listFolders({
        requestPolicy: 'network-only',
      });
      // if (recursive) {
      //   route.params?.onRefresh?.(true);
      // }
    },
    [listFolders],
  );

  useFocusEffect(
    React.useCallback(() => {
      // onRefresh();
      fabContext.setProps({
        onPress: canAdd ? () => setShowAddModal(true) : null,
      });
      fabContext.setVisible(canAdd);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canAdd, search]),
  );

  const selectFolderProps = React.useMemo(() => {
    const options = [
      { key: null, title: '/' },
      ...(listFoldersRes.data?.folderTree ?? []).map(f => ({
        key: f.id,
        title: f.path,
      })),
    ];
    const value = options.find(
      f =>
        f.key === (newName ? newName.key : showNameDialog?.folder?.id ?? null),
    )?.title;

    const myPath = `${value}/${showNameDialog?.name}`.replace('//', '/');

    return {
      options: options.filter(
        f => f.title !== myPath && f.title.indexOf(`${myPath}/`) !== 0,
      ),
      value,
      onSelect: val => setNewName(val),
    };
  }, [listFoldersRes.data, newName, showNameDialog]);

  const navigateFolder = React.useCallback(
    (folderId, folderName) =>
      navigation.navigate({
        name: 'ListDocuments',
        params: {
          ...(route.params ?? {}),
          folderId,
          folderName,
          onRefresh,
        },
        key: `Folder${folderId}`,
      }),
    [navigation, onRefresh, route.params],
  );

  const onOpenFile = React.useCallback(
    item => {
      if (item.itemType === DOCUMENT_TYPE.FOLDER) {
        navigateFolder(item.id, item.name);
      } else {
        Linking.openURL(item.url);
      }
    },
    [navigateFolder],
  );

  const onNameDialogSubmit = React.useCallback(() => {
    const submit = async () => {
      let success = true;
      const setError = error => {
        setDialogError(
          (error?.message || '').replace(/\[(Network Error|GraphQL)\]\s*/g, ''),
        );
        success = false;
      };
      if (showNameDialog?.type === 'create') {
        const res = await createFolder({
          folder: route.params?.folderId,
          name: newName,
        });
        if (res.data?.createFolder?.folder?.id) {
          onRefresh();
        } else {
          setError(res.error);
        }
      } else if (showNameDialog?.type === 'rename') {
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
      } else if (showNameDialog?.type === 'move') {
        const res = await moveDocument({
          id: showNameDialog?.id,
          dest: newName?.key,
        });

        if (res.data?.moveDocument?.document?.id) {
          onRefresh(true);
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
    createFolder,
    dialogError,
    moveDocument,
    newName,
    onRefresh,
    removeDocument,
    renameDocument,
    route.params,
    showNameDialog,
  ]);

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
      const res = await uploadDocument({
        document: rnFile,
        folder: route.params?.folderId,
      });
      if (res.data?.uploadDocument?.document?.id) {
        onRefresh();
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
  }, [onRefresh, route.params, uploadDocument]);

  const onShare = React.useCallback(
    file => {
      const share = async () => {
        const shareResp = await shareRemoteFile(file.url);
      };
      share();
    },
    [shareRemoteFile],
  );

  const renderTemplateFolders = React.useCallback(
    () => (
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <Box pl="2" pb="2" as={Layout}>
            <Text>Folders</Text>
          </Box>
        }
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Files
          </Text>
        }
        data={docTypesRes.data?.__type?.enumValues ?? []}
        keyExtractor={i => i.name}
        renderItem={({ item }) => (
          <DocumentItem
            name={item.description}
            type={DOCUMENT_TYPE.FOLDER}
            onPress={() => navigateFolder(item.name, item.description)}
          />
        )}
      />
    ),
    [docTypesRes.data, navigateFolder],
  );

  const renderTemplateFiles = React.useCallback(
    () => (
      <InfiniteFlatList
        stickyHeaderIndices={[0]}
        showListComponentsOnEmpty={false}
        ListHeaderComponent={
          <Box pl="2" pb="2" as={Layout}>
            <Text>Files</Text>
          </Box>
        }
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Files
          </Text>
        }
        query={listDocumentTemplatesQuery}
        variables={{
          folder: route.params?.folderId,
        }}
        dataExtractor={data => data.documentTemplates}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <DocumentItem
            name={item.name}
            type={DOCUMENT_TYPE.FILE}
            onPress={() => Linking.openURL(item.url)}
          />
        )}
      />
    ),
    [route.params],
  );

  const renderDocumentList = React.useCallback(
    () => (
      <InfiniteFlatList
        ref={listRef}
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Files
          </Text>
        }
        renderSectionHeader={({ section }) => (
          <Box pl="2" mb="2" as={Layout}>
            <Text>{section.title}</Text>
          </Box>
        )}
        query={listDocumentsQuery}
        variables={{
          folder: route.params?.folderId,
          search,
        }}
        dataExtractor={data => data.documents}
        keyExtractor={item => item.id}
        refresh
        sections={['Folders', 'Files']}
        sectionExtractor={item =>
          item.itemType === DOCUMENT_TYPE.FOLDER ? 'Folders' : 'Files'
        }
        renderItem={({ item }) => (
          <DocumentItem
            name={item.name}
            type={item.itemType}
            onMore={() => setMoreDialog(item)}
            onPress={() => onOpenFile(item)}
          />
        )}
      />
    ),
    [onOpenFile, route.params, search],
  );

  const renderList = React.useCallback(() => {
    if (type === 'templates' && !parentFolder) {
      return renderTemplateFolders();
    } else if (type === 'templates') {
      return renderTemplateFiles();
    }
    return renderDocumentList();
  }, [
    parentFolder,
    renderDocumentList,
    renderTemplateFiles,
    renderTemplateFolders,
    type,
  ]);

  const dialogObjectName =
    showNameDialog?.itemType === DOCUMENT_TYPE.FOLDER ? 'Folder' : 'Document';

  const moreOptions = React.useMemo(() => {
    return [
      {
        label: 'Open',
        key: 'open',
        icon: 'add_archive',
        onPress: () => {
          onOpenFile(moreDialog);
          setMoreDialog(false);
        },
      },
      moreDialog?.itemType === DOCUMENT_TYPE.FILE
        ? {
          label: 'Share',
          key: 'share',
          onPress: () => onShare(moreDialog),
          icon: 'share'
        }
        : null,
      moreDialog?.itemType === DOCUMENT_TYPE.FILE
        ? {
          label: 'Send via DocuSign',
          key: 'send',
          icon: 'send',
        }
        : null,
      {
        label: 'Rename',
        key: 'rename',
        icon: 'edit_icon',
        onPress: () => {
          const item = { ...moreDialog };
          setMoreDialog(false);
          setTimeout(() => setShowNameDialog({ ...item, type: 'rename' }), 500);
        },
      },
      {
        label: 'Move',
        key: 'move',
        icon: 'move',
        onPress: () => {
          const item = { ...moreDialog };
          setMoreDialog(false);
          setTimeout(() => setShowNameDialog({ ...item, type: 'move' }), 500);
        },
      },
      {
        label: 'Remove',
        key: 'remove',
        icon: 'remove',
        onPress: () => {
          const item = { ...moreDialog };
          setMoreDialog(false);
          setTimeout(() => setShowNameDialog({ ...item, type: 'remove' }), 500);
        },
      },
    ].filter(o => !!o);
  }, [moreDialog, onOpenFile, onShare]);

  return (
    <Box as={Layout} flex={1} position="relative" py="3" px="3">
      {renderList()}
      {/* {canAdd && <FAB onPress={() => setShowAddModal(true)} />} */}
      <Dialog
        visible={!showAddModal && !!showNameDialog}
        onHide={() => setShowNameDialog(false)}
        title={
          showNameDialog?.type === 'create'
            ? 'Create New Folder'
            : showNameDialog?.type === 'rename'
              ? `Rename ${dialogObjectName}`
              : showNameDialog?.type === 'move'
                ? `Move ${dialogObjectName}`
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
              createFolderRes.fetching ||
              renameDocumentRes.fetching ||
              removeDocumentRes.fetching ||
              moveDocumentRes.fetching,
            // hide: true,
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
        ) : showNameDialog?.type === 'move' ? (
          <SelectInputForward {...selectFolderProps} textStyle={{ width: 200 }} />
        ) : (
          <Input
            placeholder="Enter Name"
            value={newName}
            onChangeText={setNewName}
            textStyle={{ width: 200 }}
            autoFocus
            selectTextOnFocus
            onSubmitEditing={newName?.length ? onNameDialogSubmit : null}
          />
        )}
      </Dialog>
      <BottomHalfContextMenu
        menuItems={moreOptions}
        visible={!!moreDialog}
        onHide={() => setMoreDialog(null)}
        title="FILES OPTIONS"
      />
      <BottomHalfModal
        visible={showAddModal}
        onHide={() => setShowAddModal(false)}
        title="CHOOSE AN OPTION"
        buttons={[
          {
            children: 'UPLOAD FILE',
            icon: Icon('document', 'pm'),
            appearance: 'outline',
            status: 'basic',
            shape: 'rounded',
            activeOpacity: 0.7,
            disabled: uploadDocumentRes.fetching || createFolderRes.fetching,
            onPress: () => onUploadFile(),
            style: {
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
              paddingVertical: 22,
              paddingHorizontal: 20,
              borderColor: theme['grey-100'],
              borderRadius: 15,
            },
          },
          {
            children: 'CREATE FOLDER',
            icon: Icon('folder', 'pm'),
            appearance: 'outline',
            status: 'basic',
            shape: 'rounded',
            hide: true,
            activeOpacity: 0.7,
            disabled: uploadDocumentRes.fetching || createFolderRes.fetching,
            onPress: () =>
              setTimeout(() => setShowNameDialog({ type: 'create' }), 500),
            style: {
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
              paddingVertical: 22,
              paddingHorizontal: 20,
              borderColor: theme['grey-100'],
              borderRadius: 15,
            },
          },
        ]}>
        {dialogError &&
          !(uploadDocumentRes.fetching || createFolderRes.fetching) ? (
          <Text status="danger" category="c1" mb="2">
            {dialogError}
          </Text>
        ) : null}
        {uploadDocumentRes.fetching || createFolderRes.fetching ? (
          <Box
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
            width={1}>
            <Spinner size="large" />
          </Box>
        ) : null}
      </BottomHalfModal>
    </Box>
  );
};

export default DocumentList;
