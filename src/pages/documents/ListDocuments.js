import React from 'react';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import DocumentList from 'components/DocumentList';

const ListDocuments = ({navigation, route}) => {
  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{top: 'always'}}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          divider
          title={route.params?.folderName}
        />
        <DocumentList />
      </Box>
    </Box>
  );
};

export default ListDocuments;
