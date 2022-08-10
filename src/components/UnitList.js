import React from 'react';
import Box from './Box';
import { TouchableOpacity } from 'react-native';
import UnitCard from './UnitCard';
import { Layout } from '@ui-kitten/components';

import listUnitsQuery from 'queries/properties/listUnits.gql';
import InfiniteFlatList from './InfiniteFlatList';
import Text from './Text';
import useFilter from 'hooks/useFilter';
import FilterComponent from './FilterComponent';
import UnitsFiltersModal from 'pages/properties/UnitsFiltersModal';
import { noop } from 'lodash';

const UnitList = ({ navigation, refreshOnFocus, setRefreshOnFocus }) => {
  const [filter] = useFilter(["unitsFeed"])
  const variables = React.useMemo(() => ({ ...filter?.unitsFeed }), [filter?.unitsFeed]);
  
  const { dataExtractor, keyExtractor } = React.useMemo(() => {
    return {
      dataExtractor: data => data.units,
      keyExtractor: data => data.id,
    };
  }, []);

  const renderUnit = React.useCallback(
    ({ item }) => {
      return (
        <Box px={10} py="8px" flexBasis="50%">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ViewUnit', { id: item.id })}>
            <UnitCard
              status={item.status}
              unitNumber={item.unitNumber}
              rentType={item.rentType}
              price={item.price}
              image={item.photos?.[0]}
            />
          </TouchableOpacity>
        </Box>
      );
    },
    [navigation],
  );

  return (
    <Box as={Layout} flex={1}>
      <InfiniteFlatList
        query={listUnitsQuery}
        variables={variables}
        dataExtractor={dataExtractor}
        keyExtractor={keyExtractor}
        renderItem={renderUnit}
        refreshOnFocus={refreshOnFocus}
        setRefreshOnFocus={setRefreshOnFocus}
        contentContainerStyle={{ paddingVertical: 8 }}
        numColumns={2}
        ListEmptyComponent={
          <Text category="h6" py={3} textAlign="center" appearance="hint">
            No Units
          </Text>
        }
      />
      <FilterComponent Filters={UnitsFiltersModal}  setFilter={noop}/>
    </Box>
  );
};

export default UnitList;
