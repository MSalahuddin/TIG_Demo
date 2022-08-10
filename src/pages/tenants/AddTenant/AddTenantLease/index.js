import React from 'react';
import Box from 'components/Box';
import LeaseForm from 'components/Forms/LeaseForm';
import leaseMutation from "queries/properties/Lease/UploadManualLease.gql"
import { useMutation } from 'urql';
import { formatLeaseFormDataToMutation } from './helper';

const TenantLeaseForm = ({ navigation, route }) => {
    const [res, mutation] = useMutation(leaseMutation);
    const { tenantId } = route?.params;
    const handleSubmit = async (form) => {
        const data = formatLeaseFormDataToMutation({ ...form, tenantId });
        const res = await mutation(data);
        const id = res?.data?.manualUploadLease?.lease?.tenant?.id
        if (id) {
            navigation.navigate("RateTenant", {
                id,
                onUpdate: () => navigation?.navigate("TenantTabs", { refreshOnFocus: true }),
                onSkip: () => navigation?.navigate("TenantTabs", { refreshOnFocus: true })
            })
        }
    }
    return (
        <Box px={3}>
            <LeaseForm
                tenants={false}
                paymentMethod={true}
                submitBtn={true}
                leaseStatus={true}
                submitBtnTxt={"Save Tenant"}
                onSubmit={handleSubmit}
            />
        </Box>
    )
};

export default TenantLeaseForm;