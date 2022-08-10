import React from 'react';
import { useQuery } from 'urql';
import Box from 'components/Box';
import Text from 'components/Text';
import SelectButtonInputValue from 'components/SelectButtonInputValue/SelectButtonInputValue';
import formatPhoneNumber from 'utils/formatPhoneNumber';
import { DAYS, stringifyEnumValue, USER_TYPES } from 'constants/enums';
import getManagementCompanyEmployees from 'queries/properties/getManagementUsers.gql'
import { typography } from 'styles/typography';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import WhiteCard from 'components/WhiteCard';
import { TouchableOpacity } from 'react-native';
import { colors } from 'styles/theme';
import { ScrollView } from 'react-native';
import Persona from 'components/Persona';

const converAMPM = (time) => {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? 'AM' : 'PM';
        time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
};

const styles = { row: { height: undefined } }

const Work = ({ data, navigation }) => {
    const [managementUserRes] = useQuery({ query: getManagementCompanyEmployees });

    const workHours = (data?.workHours) && <Box>
        <Text textAlign={"right"} style={typography["body/x-small – regular"]} >{data?.workHours?.startDay ? `${stringifyEnumValue(DAYS, data?.workHours?.startDay)} - ${stringifyEnumValue(DAYS, data?.workHours?.endDay)}` : ""}</Text>
        <Text textAlign={"right"} style={typography["body/x-small – regular"]}  >{data?.workHours?.start ? `${converAMPM(data?.workHours?.start)} - ${converAMPM(data?.workHours?.end)}` : ""}</Text>
    </Box>

    const buildingTextProps = { textAlign: "right", style: typography["body/small – regular"], color: colors["primary/50"] }
    const buildingsJsx = data?.buildings?.edges?.length && <Box>{
        data?.buildings.edges?.map(({ node: building }) => (
            <Box
                as={TouchableOpacity}
                my={2}
                onPress={() => navigation.navigate('LandlordProperties', {
                    screen: 'ViewProperty',
                    params: { id: building.id },
                })}
            >
                <Text {...buildingTextProps}>{building.address}</Text>
                <Text {...buildingTextProps}>{building.state}, {building.zip}</Text>
            </Box>
        ))
    }</Box>

    return (
        <Box as={ScrollView}>
            <FeaturesTab
                features={[
                    { label: "Title", content: stringifyEnumValue(USER_TYPES, data?.userType) },
                    { label: "Office Email", content: data?.workingDetails?.email },
                    { label: "Office Phone", content: data?.workingDetails?.phone ? formatPhoneNumber(data?.workingDetails?.phone) : "" },
                    { label: "Office Address", content: data?.workingDetails?.address },
                    { label: "Building(s)", contentJsx: buildingsJsx, styles },
                    { label: "Hours", contentJsx: workHours },
                ]}>
                <WhiteCard px="3" py={3} my={3} header={"Management team"} headerProps={{ mb: 3 }}>
                    {managementUserRes && managementUserRes?.data?.managementUsers?.edges.map(({ node: { id, picture, title, fullName } }, index) => (
                        <Persona
                            onPress={() => navigation.navigate("ViewCoorperateProfile", { userType: USER_TYPES.MANAGEMENT, id })}
                            profile={picture}
                            name={fullName}
                            title={title}
                            mb={30} />

                    ))}
                </WhiteCard>
            </FeaturesTab>
        </Box>
    )
};

export default Work;