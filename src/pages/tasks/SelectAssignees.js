import React from 'react';
import Box from 'components/Box';
import Header from 'components/Header';
import Text from 'components/Text';
import SafeAreaView from 'components/SafeAreaView';
import { Layout, Radio } from '@ui-kitten/components';
import Input from 'components/Input';
import Icon from 'components/Icon';
import GradientButton from 'components/GradientButton';
import Persona from 'components/Persona';
import getAssigneesQuery from 'queries/tasks/getAssignees.gql';
import InfiniteFlatList from 'components/InfiniteFlatList';
import Button from 'components/Button';


export const renderPersonaItem = ({ item, isSelected, onPress }) => {
  return (
      <Persona
        name={item.fullName}
        title={item.title}
        profile={item.picture}
        activeOpacity={0.7}
        onPress={() => onPress(item)}
        my="1">
        <Box mx="3">
          <Radio
            checked={!!isSelected}
            onChange={() => onPress(item)}
          />
        </Box>
      </Persona>
  );
}

const SelectAssignees = ({ route, navigation }) => {
  const [assignees, setAssignees] = React.useState(
    route?.params?.assignees ?? [],
  );
  const [search, setSearch] = React.useState('');

  const { dataExtractor, keyExtractor, variables } = React.useMemo(
    () => ({
      dataExtractor: data => data.users,
      keyExtractor: usr => usr?.id,
      variables: {
        filter: search,
      },
    }),
    [search],
  );

  const onDone = React.useCallback(() => {
    route?.params?.onSelect?.(assignees);
    navigation.goBack();
  }, [assignees, navigation, route]);

  const isSelected = React.useCallback(
    user => {
      return assignees.findIndex(usr => usr?.id === user?.id) !== -1;
    },
    [assignees],
  );

  const toggleSelection = React.useCallback(
    user => {
      const selected = isSelected(user);
      if (selected) {
        setAssignees(assignees2 =>
          assignees2.filter(usr => usr?.id !== user?.id),
        );
      } else {
        setAssignees(assignees2 => [...assignees2, user]);
      }
    },
    [isSelected],
  );


  return (
    <Box as={Layout} flex={1}>
      <Box as={SafeAreaView} flex={1} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          divider>
          <Text category="label" transform="uppercase">
            Select Assignees
          </Text>
        </Header>
        <Box
          m={15}
          position="relative"
          flex={1}
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
          overflow="hidden">
          <Input
            icon={Icon('search')}
            placeholder="Search for a Member"
            size="small"
            mb={10}
            value={search}
            onChangeText={setSearch}
          />

          <InfiniteFlatList
            contentContainerStyle={{ paddingBottom: 64 }}
            query={getAssigneesQuery}
            variables={variables}
            dataExtractor={dataExtractor}
            keyExtractor={keyExtractor}
            renderItem={({ item }) => renderPersonaItem({ item, isSelected: isSelected(item), onPress: toggleSelection })}
          />
          <Box position="absolute" bottom={0} left={0} right={0}>
            <Button size="giant" shape="circle" onPress={onDone}>
              Done
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectAssignees;
