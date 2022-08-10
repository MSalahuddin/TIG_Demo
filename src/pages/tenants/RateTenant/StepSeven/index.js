import React from 'react';
import { ScrollView } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import SelectInput from 'components/SelectInput';
import Input from 'components/Input';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { TENANT_OPTION, formatEnumToSelectOptions, stringifyEnumValue } from 'constants/enums'

const StepSeven = ({ errors, setValue, watching }) => {
    const theme = useTheme();
    const labelStyle = { fontWeight: '600', fontSize: 16, fontFamily: theme['text-subtitle-3-font-family'], lineHeight: 24 };
    const selectInputProps = { mb: 15, placeholder: "Select", labelStyle }
    return (
        <Box as={ScrollView} flex={1} px="2" mx="3">
            <Text style={styles.headingText} mt="3" category="h3" >7. tenant behavior</Text>
            <Divider mt={10} mb={30} />
            <SelectInput
                label="Does the tenant cooperate with notices and other instructions?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.cooperates && 'danger'}
                caption={
                    errors.cooperates && errors.cooperates.message
                }
                onSelect={val => setValue('cooperates', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.cooperates)}
                {...selectInputProps}
            />
            <SelectInput
                label="Is the tenant polite and respectful to management?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.politenessRating && 'danger'}
                caption={
                    errors.politenessRating && errors.politenessRating.message
                }
                onSelect={val => setValue('politenessRating', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.politenessRating)}
                {...selectInputProps}
            />
            <SelectInput
                label="Is tenant noisy?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.isNoisy && 'danger'}
                caption={
                    errors.isNoisy && errors.isNoisy.message
                }
                onSelect={val => setValue('isNoisy', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.isNoisy)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant fight with other tenants?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.fightsWithTenants && 'danger'}
                caption={
                    errors.fightsWithTenants && errors.fightsWithTenants.message
                }
                onSelect={val => setValue('fightsWithTenants', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.fightsWithTenants)}
                {...selectInputProps}
            />
            <SelectInput
                label="Does the tenant fight with staff members?"
                options={formatEnumToSelectOptions(TENANT_OPTION)}
                status={errors.fightsWithStaff && 'danger'}
                caption={
                    errors.fightsWithStaff && errors.fightsWithStaff.message
                }
                onSelect={val => setValue('fightsWithStaff', val?.key)}
                value={stringifyEnumValue(TENANT_OPTION, watching?.fightsWithStaff)}
                {...selectInputProps}
            />
            <Input
                label="If you were to give the tenant a score from 0-100 with 100 being the best, what would you rate them?"
                labelStyle={labelStyle}
                keyboardType='numeric'
                onChangeText={val => setValue('score', val)}
                value={watching?.score}
                status={errors?.score ? 'danger' : null}
                caption={errors?.score?.message}
                placeholder="Enter a Number"
                mb={15}
            />
            <Input
                label="Additional Comments"
                labelStyle={labelStyle}
                multiline
                numberOfLines={6}
                onChangeText={val => setValue('comment', val)}
                value={watching?.comment}
                status={errors?.comment ? 'danger' : null}
                caption={errors?.comment?.message}
                placeholder="Leave some comments here"
                textStyle={{ minHeight: 120 }}
                mb={15}
            />
        </Box>
    )
};

export default StepSeven;