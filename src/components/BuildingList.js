import React, { useMemo } from 'react';
import Box from './Box';
import {Layout} from '@ui-kitten/components';
import BuildingCard from './BuildingCard';
import listPropertiesQuery from 'queries/properties/listProperties.gql';
import InfiniteFlatList from './InfiniteFlatList';
import {TouchableOpacity} from 'react-native';
import Text from './Text';
import useFilter from 'hooks/useFilter';
import FilterComponent from './FilterComponent';
import { useIsOpen } from 'hooks/useIsOpen';
import BuildingsFiltersModal from 'pages/properties/BuildingsFiltersModal';
import { noop } from 'lodash';

const BuildingList = ({navigation, refreshOnFocus, setRefreshOnFocus}) => {
  const [filter ] = useFilter(["buildingFeed"]);
  const {isOpen, close, open} = useIsOpen();

  const variables = useMemo(() =>  ({...filter?.buildingFeed}), [filter?.buildingFeed])
  const {dataExtractor, keyExtractor} = React.useMemo(() => {
    return {
      dataExtractor: data => data.buildings,
      keyExtractor: data => data.id,
    };
  }, []);

  const renderBuilding = React.useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ViewProperty', {id: item.id})}>
          <BuildingCard
            name={item.displayName}
            location={`${item.address}, ${item.city}`}
            image={item.photos?.[0]}
            vacantCount={item.vacantUnits?.edgeCount}
          />
        </TouchableOpacity>
      );
    },
    [navigation],
  );
  return (
    <Box as={Layout} flex={1}>
      <InfiniteFlatList
        query={listPropertiesQuery}
        dataExtractor={dataExtractor}
        keyExtractor={keyExtractor}
        refreshOnFocus={refreshOnFocus}
        setRefreshOnFocus={setRefreshOnFocus}
        renderItem={renderBuilding}
        variables={variables}
        contentContainerStyle={{paddingVertical: 8}}
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Properties
          </Text>
        }
      />
      <FilterComponent Filters={BuildingsFiltersModal} setFilter={noop}  />
    </Box>
  );
};

export default BuildingList;
