import React from 'react';
import styled from 'styled-components/native';
import Box from './Box';
import Text from './Text';
import useTheme from 'hooks/useTheme';
import Collapsible from 'react-native-collapsible';
import { stringifyEnumValue, NOTIFICATION_TYPES } from 'constants/enums';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

const Shadow = styled(Box)`
  shadow-opacity: 0.15;
  shadow-radius: 10;
  shadow-color: #000;
  shadow-offset: {height: 0, width: 0};
  background-color: ${({ theme }) => theme['background-basic-color-1']};
  elevation: 3;
`;

const Card = styled(Box)`
  background-color: ${({ theme }) => theme['background-basic-color-1']};
`;
const NotificationCard = ({
  title,
  body,
  createdAt,
  notificationType,
  ...props
}) => {
  const theme = useTheme();
  const [collapsed, setCollapsed] = React.useState(true);
  const navigation = useNavigation();
  const createdAtTz = new Date(createdAt);
  createdAtTz.setMinutes(
    createdAtTz.getMinutes() + 0,
  );

  return (
    <Shadow mx={10} my="8px" borderRadius={4} {...props}>
      <Card overflow="hidden" borderRadius={4}>
        <Box mx={15} my={12}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb="3">
            <Box
              opacity={
                stringifyEnumValue(NOTIFICATION_TYPES, notificationType) ? 1 : 0
              }
              borderWidth={1}
              borderColor={theme['color-primary-500']}
              borderRadius={7}
              px="2"
              py="1">
              <Text category="c1" status="primary">
                {stringifyEnumValue(NOTIFICATION_TYPES, notificationType)}
              </Text>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Text category="p2" color={theme['grey-400']} mr="1">
                {formatDistanceStrict(new Date(createdAtTz), new Date(), {
                  addSuffix: true,
                })}
              </Text>
              <Box
                width={6}
                height={6}
                borderRadius={3}
                backgroundColor={theme['color-primary-500']}
              />
            </Box>
          </Box>
          <Text mb="4px" fontSize={16}>
            {title}
          </Text>
          <Text category="p2" color={theme['grey-400']} mb="2">
            {body}
          </Text>
          <Collapsible collapsed={collapsed}>
            <Box minHeight={60}>
              <Text category="p2" mt="2">
                {body}
              </Text>
            </Box>
          </Collapsible>
          <Box
            my="2"
            mt="3"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            {props.task?.id &&
              [
                NOTIFICATION_TYPES.TASK_ASSIGNMENT,
                NOTIFICATION_TYPES.TASK_REMINDER,
                NOTIFICATION_TYPES.TASK_UPDATE,
                NOTIFICATION_TYPES.MAINTENANCE_REQUEST,
                NOTIFICATION_TYPES.LEASE_RENEWAL,
              ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1">
                <Button
                  onPress={() =>
                    navigation.navigate('ViewTask', {
                      id: props.task?.id,
                    })
                  }>
                  View Task
                </Button>
              </Box>
            ) : null}
            {props.event?.id &&
              [
                NOTIFICATION_TYPES.EVENT_ASSIGNMENT,
                NOTIFICATION_TYPES.EVENT,
                NOTIFICATION_TYPES.EVENT_REMINDER,
              ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1">
                <Button
                  onPress={() =>
                    navigation.navigate('EditEvent', { id: props.event?.id })
                  }>
                  View Event
                </Button>
              </Box>
            ) : null}
            {props.lease?.id &&
              [
                NOTIFICATION_TYPES.LEASE_SIGNED,
                NOTIFICATION_TYPES.LEASE_APPROVED,
                NOTIFICATION_TYPES.LEASE_REJECTED,
                NOTIFICATION_TYPES.LEASE_RENEWAL,
              ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1">
                <Button
                  onPress={() =>
                    navigation.navigate('LandlordTenants', {
                      navigate: ['ViewTenant', { id: props.lease?.id }],
                    })
                  }>
                  View Lease
                </Button>
              </Box>
            ) : null}
            {[
              NOTIFICATION_TYPES.COLLECT_RENT,
              NOTIFICATION_TYPES.APPROVE_PAYMENT,
            ].indexOf(notificationType) !== -1 && props.task?.id ? (
              <Box flex={1} mx="1">
                <Button
                  onPress={() =>
                    navigation.navigate('ViewTask', { id: props.task?.id })
                  }>
                  View Task
                </Button>
              </Box>
            ) : null}
            {props.payment?.lease?.id &&
              [
                NOTIFICATION_TYPES.COLLECT_RENT,
                NOTIFICATION_TYPES.APPROVE_PAYMENT,
              ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1">
                <Button
                  onPress={() =>
                    navigation.navigate('LandlordTenants', {
                      navigate: ['ViewTenant', { id: props.payment?.lease?.id }],
                    })
                  }>
                  View Lease
                </Button>
              </Box>
            ) : null}
            {props.user?.id &&
              [NOTIFICATION_TYPES.MAINTENANCE_REQUEST].indexOf(
                notificationType,
              ) !== -1 ? (
              <Box flex={1} mx="1">
                <Button
                  onPress={() =>
                    navigation.navigate('LandlordTenants', {
                      navigate: ['ViewTenant', { id: props.user?.id }],
                    })
                  }>
                  View Tenant
                </Button>
              </Box>
            ) : null}
            {props.building?.id &&
              [NOTIFICATION_TYPES.BUILDING_ASSIGNMENT].indexOf(
                notificationType,
              ) !== -1 ? (
              <Box flex={1} mx="1">
                <Button
                  onPress={() =>
                    navigation.navigate('ViewProperty', {
                      id: props.building?.id,
                    })
                  }>
                  View Building
                </Button>
              </Box>
            ) : null}
            {/* {[
              NOTIFICATION_TYPES.LEASE_APPROVED,
              NOTIFICATION_TYPES.LEASE_REJECTED,
              NOTIFICATION_TYPES.LEASE_APPROVAL,
            ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1">
                <Button
                  shape="circle"
                  onPress={() =>
                    Linking.openURL(props.lease?.agreementDoc?.url)
                  }>
                  View Lease
                </Button>
              </Box>
            ) : null} */}
          </Box>
        </Box>
      </Card>
    </Shadow>
  );
};

export default NotificationCard;
