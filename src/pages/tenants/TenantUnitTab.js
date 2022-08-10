import React, { useMemo } from 'react';
import Box from 'components/Box';
import viewTenantLeaseQuery from 'queries/tenants/viewTenantLease.gql';
import { useMutation, useQuery } from 'urql';
import {
  stringifyEnumValue,
  RENT_TYPES,
  PAYMENT_METHODS,
} from 'constants/enums';
import format from 'date-fns/format';
import manualLeaseMutation from 'queries/properties/Lease/UploadManualLease.gql';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import { formatLeaseData } from './schema';
import LeaseField from 'components/Forms/Fields/LeaseField';
import { button_styles } from 'styles/button';

import Toast from 'react-native-toast-message';
import { chain } from "helpers/func";
import { nth } from 'helpers/date';
import { usaDateFormat } from 'constants/dateFormat';
import { useSetShouldRefresh } from 'hooks/useShouldRefresh';
import { TENANT_INFO_TAB } from 'constants/refreshConsts';

const TenantUnitTab = ({ route, navigation, data, ...props }) => {
  const [leaseRes, executeQuery] = useQuery({
    query: viewTenantLeaseQuery,
    variables: {
      id: props?.userId,
      tenantTab: false,
      unitTab: true,
      documentsTab: false,
      activityTab: false,
    },
    pause: !props?.userId,
  });

  const lease = leaseRes.data?.lease;
  const unit = lease?.unit || {};

  const setRefreshInfoTab = useSetShouldRefresh(TENANT_INFO_TAB)

  const formProps = useMemo(() => ({
    units: false,
    tenants: false,
    attachments: false,
    submitBtn: false,
    initialValues: {
      paymentMethods: lease?.paymentMethods?.length && lease?.paymentMethods,
      unit,
      rentDay: {
        key: lease?.rentDay
      },
      building: unit?.building,
      start: lease?.start && new Date(lease.start),
      end: lease?.end && new Date(lease.end),
      securityDeposit: `${lease?.securityDeposit || unit.price}`,
      rentAmount: `${unit?.price}`
    }
  }), [lease, unit])

  const [_, saveLeaseMutation] = useMutation(manualLeaseMutation);

  const saveLease = async (data) => {
    const dt = { ...formatLeaseData(data), id: lease?.pk, tenantId: lease?.tenant?.pk }
    const res = await saveLeaseMutation(dt);
    if (!res?.data?.lease?.id) console.log('Error', res);
    chain([
      () => setRefreshInfoTab(),
      () => executeQuery({ requestPolicy: 'network-only' }),
      () => Toast.show({ type: "success", text1: "Lease Details Saved!" })
    ])()
  }

  return (
    <FeaturesTab
      features={[
        { label: "Building", content: unit?.building?.displayName, onContentPress: () => RootNavigation.navigate('ViewProperty', { id: unit?.building?.id }) },
        { label: "Unit", content: unit?.unitNumber, onContentPress: () => RootNavigation.navigate('ViewUnit', { id: unit?.id }) },
        { label: "Lease Start", content: lease?.start ? format(new Date(lease.start), usaDateFormat) : '' },
        { label: "Lease End", content: lease?.end ? format(new Date(lease.end), usaDateFormat) : '' },
        { label: "Rent Amount", content: lease?.rentAmount && ("$" + lease?.rentAmount) },
        { label: "Security Deposit", content: lease?.securityDeposit && ("$" + lease?.securityDeposit) },
        { label: "Status", content: unit?.rentType && stringifyEnumValue(RENT_TYPES, unit?.rentType) },
        {
          label: "Payment Method",
          content: lease?.paymentMethods?.length &&
            lease?.paymentMethods?.map(pm => stringifyEnumValue(PAYMENT_METHODS, pm)).join(", ")
        },
        { label: "Rent Day", content: lease?.rentDay + nth(lease?.rentDay) },
      ]}
    >
      <Box mt={4} mx={3}>
        {lease && <LeaseField
          value={false}
          setValue={(data) => saveLease(data)}
          formProps={formProps}
          isModal={true}
          copy={{ btn: "Edit Lease Details" }}
          {...button_styles["primary"]}
        />}
      </Box>
    </FeaturesTab>
  );
};

export default TenantUnitTab;
