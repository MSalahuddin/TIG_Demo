import React from 'react';
import Header from "components/Header"
import MultiTextSwitch from "components/MultiTextSwitch";
import { getActions } from "constants/actions"
import { useIsOpen } from "hooks/useIsOpen";
import { FINANCIAL_REPORT_TYPES } from "pages/financials/const";
import FinancialsExportModal from "../FinancialsExportModal";
import ExpensePaymentModal from '../ExpensePaymentModal';
import {styles} from "../styles"
import Box from 'components/Box';
import { stringifyEnumKey } from 'constants/enums';

export const FinancialsPageHead = ({navigation, setFilterTab, feedType, tabs, header, filters}) => {
    const { isOpen: displayExportModal, close: closeExportModal, open: openExportModal } = useIsOpen();
    const { isOpen: displayExpenseModal, close: closeExpenseModal, open: openExpenseModal } = useIsOpen();

    return (
        <>
            <Header actions={
                getActions(
                    ["back", { onPress: () => navigation.goBack() }],
                    ["export", { onPress: openExportModal, }],
                    ["plus", { onPress: openExpenseModal }]   
                )}
                title={header} />
            <Box {...styles.filtersContainer}>
                <Box width={"80%"}>
                    <MultiTextSwitch
                        shape="circle"
                        size="small"
                        onSelect={({ value }) => setFilterTab(value)}
                        options={tabs}
                        key={feedType}
                    />
                </Box>
            </Box>
            <FinancialsExportModal 
                reportType={FINANCIAL_REPORT_TYPES.FEED} 
                variables={filters} 
                visible={displayExportModal} 
                onHide={closeExportModal} 
                fileName={stringifyEnumKey(feedType)}
            />
            <ExpensePaymentModal visible={displayExpenseModal} onHide={closeExpenseModal}/>
        </>

    )
}

export default FinancialsPageHead