import React from 'react';

import Button from 'components/Button';
import { useIsOpen } from 'hooks/useIsOpen';
import ApprovedTenantActionsModal from './ApprovedTenantActionsModal';
import { t } from 'helpers/react';
import { button_styles } from 'styles/button';
import { LEASE_STATUS } from 'constants/enums';
import { getTenantTabIndexByValue } from 'pages/tenants/helpers';
import { noop } from 'lodash';

const TenantProfileActions = ({ lease, onSwitchToTab = noop, ...props }) => {
    const { isOpen, open, close } = useIsOpen(null)
    const buttonProps = getButtonProps({ open, lease, ...props }    )
    return (
        <>
            {t(!!buttonProps, <Button {...buttonProps} {...button_styles['primary']}/>)}
            <ApprovedTenantActionsModal 
                lease={lease} onHide={close} visible={isOpen}
                toLeaseTab={()=>onSwitchToTab(getTenantTabIndexByValue('TenantUnit'))}
            />
        </>
    )
};

const getButtonProps = ({ isApproved, open, isCurrent, isPast, isProspective, lease, navigation, tenant, onRefresh }) => {
    if (isApproved || lease?.status === LEASE_STATUS.APPROVED) return {
        children: "Actions", onPress: open
    }
    if (isCurrent || lease?.status === LEASE_STATUS.CURRENT) return {
        children: "Rate The Tenant", 
        onPress: () => navigation.navigate('RateTenant', {
            id: tenant?.id,
            onUpdate: () => {
                onRefresh()
                navigation.goBack();
            }
        })
    }
}


export default TenantProfileActions