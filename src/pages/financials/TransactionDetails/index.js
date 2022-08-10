
import React, { useMemo } from 'react';
import { styles } from './styles';
import { FINANCIAL_REPORT_TYPES, OUTSTANDING_DEBTS, CASH_IN, REVENUE, CASH_FLOW } from '../const';
import NoticeActions from './NoticeActions';
import { getActions } from 'constants/actions';
import { t } from 'helpers/react';
import { useIsOpen } from 'hooks/useIsOpen';
import FinancialsExportModal from '../FinancialsFeedPage/FinancialsExportModal';
import { getTransactionDetailedCardsData } from './dataFormatter';
import getPaymentQuery from "queries/financials/getPayment.gql"

import DetailedCards from 'components/DetailedCard/DetailedCards';
import TransactionDetailsHead from './TransactionDetailsHead';
import { colors } from 'styles/theme';
import HeadedScreen from 'components/HeadedScreen';
import { getIn } from 'helpers/object';
import { useQuery } from 'urql';

const FEED_TYPE_TO_REPORT_TYPE = {
  [OUTSTANDING_DEBTS]: FINANCIAL_REPORT_TYPES.OVERDUE
}
const TransactionDetails = ({ navigation, route }) => {
  const { payment, feedType, filterTab } = route?.params || {}
  const { isOpen, close, open } = useIsOpen();
  const isOutstanding = feedType === OUTSTANDING_DEBTS;
  const isIncoming = filterTab === CASH_IN || filterTab === REVENUE || isOutstanding;

  const [res] = useQuery({ query: getPaymentQuery, pause: !route?.params?.id, variables: { id: route?.params?.id } })
  const data = useMemo(() => res?.data?.payment || payment || {}, [res?.data?.payment, payment]);
  const { id } = data;
  const name = isIncoming ? data?.payer?.fullName : data?.recipient?.fullName;
  const picture = isIncoming ? data?.payer?.picture : data?.recipient?.picture;
  const notice = isOutstanding && getIn(data, ["lease", "notices", "edges", 0, "node"]);
  const date = feedType === CASH_FLOW ? data?.latestPayment : data?.due

  const onViewAllTransactions = (filters) => {
    const variables = { ...filters }
    navigation.navigate("ViewAllTransactions", { filterTab, feedType, variables, header: name })
  }
  const details = getTransactionDetailedCardsData(data, isOutstanding, onViewAllTransactions, isIncoming)
  const actions = useMemo(() => getActions(['back', { onPress: () => navigation.goBack() }], ["export", { onPress: open, }],), [navigation])
  return (
    <HeadedScreen actions={actions} backgroundColor={colors['gray scale/5']} headerStyle={styles.header}>
      <TransactionDetailsHead
        name={name}
        picture={picture}
        date={date}
        paymentMethod={data.paymentMethod}
        amount={data.amount}
        filterTab={filterTab}
        feedType={feedType}
        isIncoming={isIncoming}
        isOutstanding={isOutstanding}
        amountDue={data?.amountDue}
        amountPaid={data?.amountPaid}
        displayFeatures={isOutstanding || filterTab === REVENUE}
        notice={notice}
      />
      <DetailedCards data={details} styles={styles.transactionDetailedCard} >
        {t(isOutstanding, <NoticeActions leaseId={data?.lease?.pk} notice={notice} />)}
      </DetailedCards>
      <FinancialsExportModal
        reportType={FEED_TYPE_TO_REPORT_TYPE[feedType] || FINANCIAL_REPORT_TYPES.TRANSACTION}
        variables={{ id }}
        visible={isOpen}
        onHide={close}
      />
    </HeadedScreen>
  )
}

export default TransactionDetails;
