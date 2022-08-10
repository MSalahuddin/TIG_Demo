import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import SliderInput from 'components/SliderInput';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { TENANT_OPTION, formatEnumToSelectOptions, stringifyEnumValue } from 'constants/enums'

const StepFour = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    const selectInputProps = { mb: 15, placeholder: "Select", labelStyle }
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >{`4. Service & Maintenance Request`}</Text>
            <Divider mt={10} mb={30} />
            <SelectInput
                label="Does the tenant go through the proper channels to report problems in the apartment?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.reportsIssuesProperly && 'danger'}
                caption={
                    errors.reportsIssuesProperly && errors.reportsIssuesProperly.message
                }
                onSelect={val => setValue('reportsIssuesProperly', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.reportsIssuesProperly)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant make legitimate requests?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.makesLegitimateRequests && 'danger'}
                caption={
                    errors.makesLegitimateRequests && errors.makesLegitimateRequests.message
                }
                onSelect={val => setValue('makesLegitimateRequests', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.makesLegitimateRequests)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant threaten management to make the necessary repair?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.doesThreatenManagement && 'danger'}
                caption={
                    errors.doesThreatenManagement && errors.doesThreatenManagement.message
                }
                onSelect={val => setValue('doesThreatenManagement', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.doesThreatenManagement)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant give sufficient time for management to deal with the repair?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.givesSufficientTime && 'danger'}
                caption={
                    errors.givesSufficientTime && errors.givesSufficientTime.message
                }
                onSelect={val => setValue('givesSufficientTime', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.givesSufficientTime)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant make the same complaints repeatedly?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.replicatesComplaints && 'danger'}
                caption={
                    errors.replicatesComplaints && errors.replicatesComplaints.message
                }
                onSelect={val => setValue('replicatesComplaints', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.replicatesComplaints)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant provide access to the apartment when necessary?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.providesAccess && 'danger'}
                caption={
                    errors.providesAccess && errors.providesAccess.message
                }
                onSelect={val => setValue('providesAccess', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.providesAccess)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant cooperate with notices and other instructions?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.cooperatesWithInstructions && 'danger'}
                caption={
                    errors.cooperatesWithInstructions && errors.cooperatesWithInstructions.message
                }
                onSelect={val => setValue('cooperatesWithInstructions', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.cooperatesWithInstructions)}
                {...selectInputProps}
            />
            <SelectInput
                label="Is management contacted excessively?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.contactsManagementExcessively && 'danger'}
                caption={
                    errors.contactsManagementExcessively && errors.contactsManagementExcessively.message
                }
                onSelect={val => setValue('contactsManagementExcessively', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.contactsManagementExcessively)}
                {...selectInputProps}
            />
            <SliderInput
                min={0}
                max={7}
                labelStyle={labelStyle}
                label="Generally, is this tenant difficult to deal with?"
                onChange={val => setValue('difficultyRating', val)}
                value={watching?.difficultyRating}
            />
        </Box>
    )
};

export default StepFour;