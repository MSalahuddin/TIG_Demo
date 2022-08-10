import React, { useState } from 'react';
import TenantList from 'components/TenantList';
import Box from 'components/Box';
import useFilter from 'hooks/useFilter';
import MultiTextSwitch from 'components/MultiTextSwitch';
import { TENANT_LIST_TABS } from './styles';
import BuildingField from 'components/Forms/Fields/BuildingField';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const tabs = TENANT_LIST_TABS;

const TenantTabs = ({ navigation, route }) => {
  const [{ building }, setFilter] = useFilter('building');
  const [feedFilter, setFeedFilter] = useState({ "isCurrent": true })
  const { refreshOnFocus = false } = route?.params || {};


  return (
    <>
      <Box my="2" px="40">
        <MultiTextSwitch
          shape="circle"
          size="small"
          options={tabs}
          onSelect={({ value }) => setFeedFilter({ [value]: true })}
        />
      </Box>
      <Box
        flexDirection="row"
        mx={1}
        mb="2px"
        justifyContent="space-between">
        <BuildingField
          copy={{ label: "Filter By Building" }}
          px={3}
          borderTopWidth={1}
          borderBottomWidth={1}
          borderColor={colors["gray scale/10"]}
          setValue={val => setFilter('building', val)}
          value={building}
          labelStyle={typography["body/medium – regular"]}
        />
      </Box>
     
      <TenantList
        navigation={navigation}
        building={building}
        refreshOnFocus={refreshOnFocus}
        queryParams={feedFilter}
      />
    </>
  );
};

export default TenantTabs;
