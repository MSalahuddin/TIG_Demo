import React, { useEffect, useMemo, useState } from 'react';
import Box from 'components/Box';
import { feedTypes, TABS_TO_FILTER } from '../const';

import { useIsOpen } from 'hooks/useIsOpen';
import SafeAreaView from 'components/SafeAreaView';
import { arrayToObject } from 'helpers/object';

import FinancialsPageHead from './FinancialsPageHead';
import FinancialsFeed from './FinancialsFeed';

const FinancialsFeedPage = ({ navigation, route }) => {
    const feedType = route.params?.type
    if (!feedType) return null;
    const [filter, setFilter] = useState({});
    const [filterTab, setFilterTab] = useState(null);
    const { isOpen: displayGraph } = useIsOpen();

    const { tabs, cardThemeMap, header, feedVariables } = useMemo(() => getFeedTypeParams(feedType), [feedType]);
    const { themeColor, graphOnly, tabVariables } = useMemo(() => getTabParams(cardThemeMap, filterTab), [filterTab, cardThemeMap])

    useEffect(() => setFilterTab(tabs[0].value), [feedType, tabs]);
    const listVariables = { ...filter, ...tabVariables, ...feedVariables }
    return (
        <Box flex={1} as={SafeAreaView}>
            <FinancialsPageHead
                header={header}
                navigation={navigation}
                setFilterTab={setFilterTab}
                tabs={tabs}
                feedType={feedType}
                filters={listVariables}
            />
            <FinancialsFeed 
                displayGraph={graphOnly || displayGraph}
                filterTab={filterTab}
                filters={filter}
                setFilters={setFilter}
                themeColor={themeColor}
                feedType={feedType}
                cardThemeMap={cardThemeMap}
                variables={listVariables}
            />
        </Box>
    )
};

const getFeedTypeParams = (feedType) => {
    const {tabs, header, variables: feedVariables} = feedTypes[feedType]
    return {
        tabs,
        header,
        feedVariables,
        cardThemeMap: arrayToObject(tabs, "value"),
    };
};

const getTabParams = (cardThemeMap, filterTab) => {
    return {
        themeColor: cardThemeMap[filterTab]?.themeColor,
        graphOnly: cardThemeMap?.[filterTab]?.graphOnly,
        tabVariables: TABS_TO_FILTER?.[filterTab] ?? null
    }
};

export default FinancialsFeedPage