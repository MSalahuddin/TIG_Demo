import React, { useMemo } from 'react';
import { useMutation } from 'urql';
import Dialog from 'components/Dialog';
import { styles } from './styles'
import updateApplicationStatus from 'queries/tenants/application/UpdateApplicationStatus.gql';
import Toast from 'react-native-toast-message';
import { chain } from "helpers/func";
import { dialogsProps } from './props';

const ApplicationApproval = ({ onSuccess, applicationApprovalModalTypeState, applicationId, onHide }) => {
  const [applicationApprovalModalType, setApplicationApprovalModalType] = applicationApprovalModalTypeState;
  const dialogProps = useMemo(() => applicationApprovalModalType ? dialogsProps[applicationApprovalModalType] : {},
    [applicationApprovalModalType])

  const [undefined, updateApplicationStatusMutation] = useMutation(updateApplicationStatus);

  const setApplicationStatus = async () => {
    const res = await updateApplicationStatusMutation(
      {
        isApproved: applicationApprovalModalType === 'accept',
        applicationId
      }
    );
    if (!res?.data?.updateTenantApplicationStatus?.success) {
      console.log('Error', res);
      Toast.show({ type: "error", text1: 'Error' })
      return
    }
 
    const message = applicationApprovalModalType === 'accept' ? 'Tenant Approved' : 'Tenant is denied';
    chain([
      () => setApplicationApprovalModalType(''),
      () => Toast.show({ type: "success", text1: message }),
      () => onHide?.(),
      () => onSuccess?.()
    ])()
  }

  return (
    <>
      <Dialog
        visible={applicationApprovalModalType !== ''}
        onHide={() => {
          setApplicationApprovalModalType('');
          onHide?.();
        }
        }
        title={dialogProps.title}
        content={dialogProps.content}
        styles={styles.application_approval_dialog.dialog}
        buttonsContainerStyle={styles.application_approval_dialog.buttons.container}
        buttons={[
          {
            gradient: false,
            children: dialogProps.cancelButtonText,
            shape: 'circle',
            hide: true,
            style: styles.application_approval_dialog.buttons.denyButton,
            textStyle: styles.application_approval_dialog.buttons.denyTextStyle,
            size: "giant",
            containerStyle: {
              width: '50%',
              paddingRight: 5
            },
            onPress: () => setApplicationApprovalModalType('')
          },
          {
            gradient: true,
            children: dialogProps.confirmButtonText,
            shape: 'circle',
            hide: true,
            style: styles.application_approval_dialog.buttons.acceptButton,
            size: "giant",
            containerStyle: {
              width: '50%',
              paddingLeft: 5
            },
            onPress: () => setApplicationStatus()
          },
        ]}
      />
    </>
  )
}

export default ApplicationApproval;
