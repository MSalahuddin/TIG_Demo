import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { TENANT_OPTION, formatEnumToSelectOptions, stringifyEnumValue } from 'constants/enums'

const StepTwo = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    const selectInputProps = { mb: 15, placeholder: "Select", labelStyle }
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >2. PAYMENT</Text>
            <Divider mt={10} mb={30} />
            <SelectInput
                label="Does the tenant pay rent?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.payRent && 'danger'}
                caption={
                    errors.payRent && errors.payRent.message
                }
                onSelect={val => setValue('payRent', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.payRent)}
                {...selectInputProps}
            />
            <SelectInput
                label="Do they pay rent on time?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.paysOnTime && 'danger'}
                caption={
                    errors.paysOnTime && errors.paysOnTime.message
                }
                onSelect={val => setValue('paysOnTime', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.paysOnTime)}
                {...selectInputProps}
            />
            { (watching?.paysOnTime != 1)  &&
                <>
                    <SelectInput
                        label="How often are payments late?"
                        options={formatEnumToSelectOptions(TENANT_OPTION)}
                        status={errors.lateFrequency && 'danger'}
                        caption={
                            errors.lateFrequency && errors.lateFrequency.message
                        }
                        onSelect={val => setValue('lateFrequency', val?.key)}
                        value={stringifyEnumValue(TENANT_OPTION, watching?.lateFrequency)}
                        {...selectInputProps}
                    />
                    <SelectInput
                        label="Is there communication with management upon a late rent payment?"
                        options={formatEnumToSelectOptions(TENANT_OPTION)}
                        status={errors.isLateJustified && 'danger'}
                        caption={
                            errors.isLateJustified && errors.isLateJustified.message
                        }
                        onSelect={val => setValue('isLateJustified', val?.key)}
                        value={stringifyEnumValue(TENANT_OPTION, watching?.isLateJustified)}
                        {...selectInputProps}
                    />
                    <SelectInput
                        label="Is their reason for a late rent payment justified?"
                        options={formatEnumToSelectOptions(TENANT_OPTION)}
                        status={errors.isLateCommunicated && 'danger'}
                        caption={
                            errors.isLateCommunicated && errors.isLateCommunicated.message
                        }
                        onSelect={val => setValue('isLateCommunicated', val?.key)}
                        value={stringifyEnumValue(TENANT_OPTION, watching?.isLateCommunicated)}
                        {...selectInputProps}
                    />
                </>
            }
        </Box>
    )
};

export default StepTwo;