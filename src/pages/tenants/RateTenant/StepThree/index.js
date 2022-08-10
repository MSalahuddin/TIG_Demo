import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import YesNoInput from 'components/YesNoInput';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { formatEnumToSelectOptions, TENANT_OPTION, stringifyEnumValue } from 'constants/enums'

const StepThree = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    const selectInputProps = { mb: 15, placeholder: "Select", labelStyle }
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >3. LEASE TERM</Text>
            <Divider mt={10} mb={30} />
            <SelectInput
                label="Does the tenant comply with the lease terms?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.compliesToTerms && 'danger'}
                caption={
                    errors.compliesToTerms && errors.compliesToTerms.message
                }
                onSelect={val => setValue('compliesToTerms', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.compliesToTerms)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant follow the rules of the buildings?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.followsBuildingRules && 'danger'}
                caption={
                    errors.followsBuildingRules && errors.followsBuildingRules.message
                }
                onSelect={val => setValue('followsBuildingRules', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.followsBuildingRules)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant sublet the unit without permission?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.subletsWithoutPermission && 'danger'}
                caption={
                    errors.subletsWithoutPermission && errors.subletsWithoutPermission.message
                }
                onSelect={val => setValue('subletsWithoutPermission', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.subletsWithoutPermission)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant notify management of any upgrades made to his unit?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.notifiesUpgrades && 'danger'}
                caption={
                    errors.notifiesUpgrades && errors.notifiesUpgrades.message
                }
                onSelect={val => setValue('notifiesUpgrades', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.notifiesUpgrades)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant dispose of the garbage properly?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.disposesGarbageAppropriately && 'danger'}
                caption={
                    errors.disposesGarbageAppropriately && errors.disposesGarbageAppropriately.message
                }
                onSelect={val => setValue('disposesGarbageAppropriately', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.disposesGarbageAppropriately)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant honestly disclose guests, sublets, repairs, and other incidents?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.notifiesHonestly && 'danger'}
                caption={
                    errors.notifiesHonestly && errors.notifiesHonestly.message
                }
                onSelect={val => setValue('notifiesHonestly', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.notifiesHonestly)}
                {...selectInputProps}
            />
            <YesNoInput
                label="Did the tenant try to terminate the lease early with or without cause?"
                onChange={val => setValue('terminatedEarly', val)}
                value={watching?.terminatedEarly}
                error={errors?.terminatedEarly?.message}
                labelStyle={labelStyle}
                buttonStyle={styles.actionButton}
            />
            <YesNoInput
                label="Did the tenant have a viable cause?"
                onChange={val => setValue('terminatedEarlyWithViableCause', val)}
                value={watching?.terminatedEarlyWithViableCause}
                error={errors?.terminatedEarlyWithViableCause?.message}
                labelStyle={labelStyle}
                buttonStyle={styles.actionButton}
            />
        </Box>
    )
};

export default StepThree;