import React from 'react';

import Toast from "react-native-toast-message";
import { useMutation } from 'urql';
import sendLeaseMutation from 'queries/properties/Lease/SendLease.gql'
import { ModalOption } from 'components/AttachmentModal';
import BottomHalfModal from 'components/BottomHalfModal';
import { useLoader } from 'hooks/useLoader';
import { useSetShouldRefresh } from 'hooks/useShouldRefresh';
import { TENANT_INFO_TAB } from 'constants/refreshConsts';

const ApprovedTenantActionsModal = ({ lease, toLeaseTab, ...props }) => {
    const { loader, loadingFunc } = useLoader();
    const [res, sendLease] = useMutation(sendLeaseMutation);
    const setRefreshInfoTab = useSetShouldRefresh(TENANT_INFO_TAB);

    const handleSuccess = () => {
        Toast.show({ type: "success", text1: "Lease Package Sent Successfully" });
        setRefreshInfoTab()
    }

    const handleSendLease = loadingFunc(async () => {
        props?.onHide()

        if (lease?.detailsFilled) {
            const res = await sendLease({ id: lease?.pk });
            if (res?.data?.sendLease?.success) return handleSuccess()
        }
        else {
            Toast.show({
                type: "error1",
                text1: 'Error',
                text2: 'Must input lease details to send a lease package',
                autoHide: false,
                position: 'top',
                props: {
                    actionButton: {
                        text: 'Go to lease details',
                        onPress: () => {
                            Toast.hide()
                            toLeaseTab?.()
                        }
                    }
                }
            })
        }

    })



    return (
        <>
            {loader}
            <BottomHalfModal {...props} >
                <ModalOption onPress={handleSendLease} text={"Call"} iconProps={{ name: 'phone', pack: "pm", }} />
                <ModalOption onPress={handleSendLease} text={"Send Lease Package"} iconProps={{ name: 'document', pack: "pm", }} inactive={lease?.leaseSigned} />
            </BottomHalfModal>
        </>
    )
}

export default ApprovedTenantActionsModal