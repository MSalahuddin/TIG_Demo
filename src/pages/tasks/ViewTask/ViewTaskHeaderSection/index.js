import React from "react"
import BorderedText from "components/BorderedText";
import Box from "components/Box";
import Text from "components/Text";
import { stringifyEnumValue, TASK_PRIORITY, MAINTENANCE_TIME_PREFERENCES, TASK_TYPES } from "constants/enums";
import { t } from "helpers/react";
import useTheme from "hooks/useTheme";
import styled from 'styled-components/native';
import ViewTaskSection from "../ViewTaskSection";

const priorityColors = {
    [TASK_PRIORITY.HIGH]: 'primary2',
    [TASK_PRIORITY.MEDIUM]: 'info',
    [TASK_PRIORITY.LOW]: 'primary',
};


export const TEXT = styled(Text).attrs(({...styles})  => ({
    ...styles
}))`
    text-transform: uppercase;
`;


const ViewTaskHeaderSection = ({ title, priority, taskType, unit, content, building, maintenanceRequest, }) => {
    const theme = useTheme()
    return (
        <>
            <Box
                mt={1}
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center">
                {t(priority, <BorderedText c={"#fff"} bw={0} bgc={theme[`color-${priorityColors[priority]}-500`]} textProps={{ status: "control" }} text={stringifyEnumValue(TASK_PRIORITY, priority)} />)}
            </Box>
            <TEXT ml="-2px" category="h1" mt="2" fontSize={20} fontWeight={"bold"} color={theme['color-primary-700']}>
                {title}
            </TEXT>
            {
                t(building,
                    <Text category="p2" pb={2} appearance="hint" my="1" color={theme['grey-300']}>
                        {building?.address}
                        {unit ? `, Unit ${unit?.unitNumber}` : null}
                    </Text>
                )
            }

            <ViewTaskSection display={content} label={"Note:"} divider theme={theme} styles={{ content: { mx: 0, my: 0 }, container: { my: 0, pt: 0, mb: 2 }, label: { marginTop: 0 } }}>
                <Text category="p2" appearance="hint" color={theme['grey-300']}>
                    {content}
                    {maintenanceRequest
                        ? `\n\n${maintenanceRequest.timePreference
                            ? `Location: ${maintenanceRequest.location}\n`
                            : ''
                        }${maintenanceRequest.timePreference
                            ? `Has permission to enter if tenant is not home: ${maintenanceRequest.enterPermission
                                ? 'YES'
                                : 'NO'
                            }\n`
                            : ''
                        }${maintenanceRequest.timePreference
                            ? `Time Preference: ${stringifyEnumValue(
                                MAINTENANCE_TIME_PREFERENCES,
                                maintenanceRequest.timePreference,
                            )}\n`
                            : ''
                        }${maintenanceRequest.additionalDetails
                            ? `Additional Details:\n${maintenanceRequest.additionalDetails}`
                            : ''
                        }`
                        : null}
                </Text>
            </ViewTaskSection>
        </>
    )
};

export default ViewTaskHeaderSection;