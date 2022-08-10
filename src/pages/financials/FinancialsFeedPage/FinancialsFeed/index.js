import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import FinancialsFiltersPage from '../FinancialsFiltersPage';
import GraphFilters from '../FinancialsGraph/GraphFilters';
import FinancialsGraph from '../FinancialsGraph';
import InfiniteFlatList from 'components/InfiniteFlatList';
import financialsQuery from "queries/financials/getFinancialsFeed.gql";
import FilterComponent from 'components/FilterComponent';
import FinancialsFeedCard from '../FinancialsFeedCard';
import { useGetListProps } from 'hooks/useGetListProps';
import { styles } from "../styles"
import Box from 'components/Box';
import { renderSectionHeader as _renderSectionHeader } from 'pages/tasks/TaskList';
import { useIsFocused } from '@react-navigation/core';
import { sectionExtractor, _getSections, renderSectionHeader } from "../../../../helpers/list";
import { CASH_FLOW } from 'pages/financials/const';

const dataExtractor = (data) => data?.payments;

const FinancialsFeed = ({ setFilters, displayGraph, filters, feedType, filterTab, cardThemeMap, variables }) => {
    const [sections, setSections] = useState([]);
    const dataRef = useRef();
    const listRef = useRef();
    const isFocused = useIsFocused();


    const itemDateField = useMemo(() => feedType === CASH_FLOW ? "latestPayment" : "due", [feedType])

    const listProps = useGetListProps({
        dataExtractor,
        renderItem: ({ item }) => <FinancialsFeedCard isIncoming={variables.isIncoming} isOutgoing={variables.isOutgoing} feedType={feedType} filterTab={filterTab} payment={item} />,
        variables,
        dataRef,
        onResCallback: (res) => getSections(res?.data),
        sections,
        sectionExtractor: (item) => sectionExtractor({ date: item[itemDateField] }),
        renderSectionHeader: (section) => renderSectionHeader(section, styles.sectionHeaderText),
    }, [filterTab, feedType, filters, variables, sections]);


    const getSections = (_data) => {
        const sections = _getSections(_data?.payments?.edges, itemDateField)
        return setSections(sections)
    }

    useEffect(() => {
        if (isFocused) listRef.current?.refresh()
    }, [filters, feedType, isFocused]);

    return (
        <>
            <Box flex={1} style={{ display: displayGraph ? "none" : null }}>
                <InfiniteFlatList
                    query={financialsQuery}
                    ref={listRef}
                    key={filterTab}
                    {...listProps}
                />
            </Box>
            <Box style={{ display: !displayGraph ? "none" : null }}>
                <FinancialsGraph
                    activeTab={filterTab}
                />
            </Box>
            {displayGraph ? <FilterComponent Filters={GraphFilters} setFilter={setFilters} /> : <FilterComponent Filters={FinancialsFiltersPage} setFilter={setFilters} />}

        </>
    )
};

export default FinancialsFeed