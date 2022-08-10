import React, { useMemo, } from 'react';
import { useQuery } from 'urql';
import ProfilePage from 'components/ProfilePage';
import { getActions } from 'constants/actions';
import { tabs, steps, } from "./schema";
import viewTenantLeaseQuery from 'queries/tenants/viewTenantLease.gql';
import Text from 'components/Text';
import BorderedText from 'components/BorderedText';
import useTheme from 'hooks/useTheme';
import Box from 'components/Box';
import { LEASE_STATUS } from 'constants/enums';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { IS_SMALLER } from 'styles/responsive';

const ViewTenant = ({ navigation, route, userType = 1 }) => {
    const theme = useTheme();
    const actions = useMemo(() => getActions(
        ['back', { onPress: () => navigation?.goBack() }],
        ["editIcon", {
            onPress: () => navigation.navigate('AddTenant', {
                id: route?.params?.id,
                onUpdate: onRefresh,
            }), disable: true, height: 21, width: 21, marginTop: 3
        }]
    ), [navigation]);

    const [leaseRes, executeQuery] = useQuery({
        query: viewTenantLeaseQuery,
        variables: {
            id: route?.params?.id,
            tenantTab: true,
            unitTab: false,
            documentsTab: false,
            activityTab: false,
        },
        pause: !route?.params?.id,
    });

    const onRefresh = React.useCallback(() => {
        executeQuery({ requestPolicy: 'network-only' });
    }, [executeQuery]);

    const lease = useMemo(() => leaseRes.data?.lease, [leaseRes?.data]);

    const dividerRow = (
        <Box height={1} backgroundColor={colors["gray scale/10"]} flex={1}></Box>
    );

    const TenantTagsComponent = React.useMemo(() => {
        let title = 'Tenant';
        let bgc;
        let color = "#fff";
        let leaseStatus;
        switch (leaseRes.data?.lease?.status) {
            case LEASE_STATUS.CURRENT:
                title = 'Current';
                bgc = colors["primary/50"]
                break;
            case LEASE_STATUS.PAST:
                title = 'Past';
                bgc = colors["gray scale/20"]
                color = "#000";
                break;
            case LEASE_STATUS.APPROVED:
                title = 'Approved';
                bgc = colors["additional/out & expens"]
                if (lease.leaseSent) {
                    leaseStatus = "Lease Sent"
                } else if (lease.leaseSigned) {
                    leaseStatus = "Lease Signed"
                } else {
                    leaseStatus = "Lease Needed"
                }
                break;
            case LEASE_STATUS.PROSPECTIVE:
                title = 'Prospective';
                bgc = colors["additional/profit"]
                break;
        }
        return (
            <>

                <Box flexDirection="row" alignItems="center" justifyContent="center" width="100%" px={18} mt={1}>
                    {dividerRow}
                    <Box flexDirection="row" alignItems="center" px={2}>
                        <BorderedText
                            text={title}
                            bgc={bgc}
                            c={color}
                            py={1} px={2} mt={0} mx={1} bw={0} br={7}
                            styles={{ text: typography["body/x-small – regular"] }}
                        />
                        {t(
                            leaseRes.data?.lease?.status === LEASE_STATUS.APPROVED,
                            <BorderedText mx={1} py={1} px={2} mt={0} bw={0} br={7}
                                bgc={colors["additional/alarm"]}
                                c={"#fff"}
                                styles={{ text: typography["body/x-small – regular"] }}
                                text={leaseStatus} />
                        )}
                    </Box>
                    {dividerRow}
                </Box>
            </>
        );
    }, [leaseRes.data, theme]);

    const headerChildren = () => {
        return (
            <Box alignItems="center">
                <Text color={colors["gray scale/40"]} style={typography["body/x-small – regular"]}>
                    {leaseRes.data?.lease?.tenant?.receivedReviews.edgeCount
                        ? `${leaseRes.data?.lease?.tenant?.rank}% (${leaseRes.data?.lease?.tenant?.receivedReviews.edgeCount} reviews)`
                        : '0 Reviews'}
                </Text>
                <Box pointerEvents="none" mt="3" justifyContent={"center"} flexDirection={"row"}>
                    {TenantTagsComponent}
                </Box>
            </Box>
        )
    }

    return (
        <ProfilePage
            user={leaseRes?.data?.lease?.tenant}
            userId={route?.params?.id}
            fetching={leaseRes?.fetching}
            navigation={navigation}
            actions={actions}
            tabs={tabs}
            steps={steps}
            route={route}
            flexSize={IS_SMALLER ? 2 : 2.5}
            extraHeaderContent={headerChildren}
            refetchData={onRefresh}
        />
    );
};

export default ViewTenant;
