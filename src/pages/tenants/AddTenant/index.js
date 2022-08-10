import React, { useState } from 'react';
import Box from 'components/Box';
import useForm from 'react-hook-form';
import SafeAreaView from 'components/SafeAreaView';
import LazyScreen from 'utils/LazyScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation, useQuery } from 'urql';
import viewTenantLeaseQuery from 'queries/tenants/viewTenantLease.gql';
import FormError from 'components/Forms/FormError';
import Form from 'components/Form';
import AddTenantFormField from './AddTenantFormField';
import { useLoader } from 'hooks/useLoader';
import Button from 'components/Button.js';
import { styles } from './styles.js';
import { formatTenantFormDataToMutation, formatedInitialValues, schema } from './schema';
import mutation from 'queries/tenants/addTenant.gql';
import { useRegisterFields } from 'hooks/useRegisterFields';
import { validateRequiredFields } from 'helpers/validators';
import { useFormError } from "hooks/useFormError";

const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phoneNumberCell',
    'dataOfBirth',
    'currentAddress',
    'currentReferenceName',
    'currentReferencePhone',
    'previousAddress',
    'docType',
    'docNumber',
];

const AddTenant = ({ navigation, route }) => {
    const [scrollView, setScrollView] = useState({})
    const {error, setError} = useFormError({scrollView})
    const tenantId = route?.params?.id;
    const [res] = useQuery({
        query: viewTenantLeaseQuery,
        variables: {
            id: tenantId,
            tenantTab: false,
            unitTab: false,
            documentsTab: false,
            activityTab: false,
        },
        pause: !tenantId,
    });

    const initialValues = React.useMemo(() => {
        const tenant = res?.data?.lease?.tenant;
        if (tenant) {
            return formatedInitialValues(tenant);
        }
        return null;
    }, [res.data]);
    const isNew = !tenantId;
    const [editRes, addTenantMutation] = useMutation(mutation);
    const {
        register,
        setValue,
        handleSubmit,
        errors,
        unregister,
        watch,
        getValues,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: initialValues || {},
        validationSchema: schema,
    });

    React.useEffect(() => {
        const values = getValues();
        if (initialValues) {
            Object.keys(initialValues).forEach(
                k => !values[k] && setValue(k, initialValues[k]),
            );
        }
    }, [getValues, initialValues, setValue]);

    useRegisterFields(Object.keys(schema.fields), register, unregister)

    const watching = watch([
        'firstName',
        'lastName',
        'email',
        'phoneNumberCell',
        'phoneNumberWork',
        'dataOfBirth',
        'currentAddress',
        'currentReferenceName',
        'currentReferencePhone',
        'previousAddress',
        'previousReferenceName',
        'previousReferencePhone',
        'docType',
        'docNumber',
        'occupation',
        'emergencyContact',
        "picture",
        'emergencyContactPhone'
    ]);
    const submitting =
        editRes.fetching || isSubmitting || (!isNew && res.fetching);

    const onSubmit = React.useCallback(
        async _ => {
            let form = getValues();
            const isFilled = validateRequiredFields(form, requiredFields)
            if (!isFilled) return setError("Please fill all required fields.")
            setError(null);
            const tenant = formatTenantFormDataToMutation(form);
            const res = await addTenantMutation({ data: tenant }, { requestPolicy: 'network-only' },);
            const tenantId = res?.data?.upsertTenant?.tenant?.pk
            if (tenantId) return navigation.navigate("AddTenantsUnit", { tenantId });
            setError("Failed to create tenant, please ensure fields are filled correctly.")
        },
        [addTenantMutation, isNew, navigation, route, handleSubmit, setError],
    );
    const { loader, } = useLoader({ isLoading: submitting })

    return (
        <Box as={SafeAreaView} flex={1}>
            {loader}
            <LazyScreen>
                <KeyboardAwareScrollView enableResetScrollToCoords={false} innerRef={setScrollView}>
                    <Box px={15} pt={3}>
                        <Form loading={submitting} onSubmit={handleSubmit(onSubmit)}>
                            <FormError error={error} />
                            <AddTenantFormField
                                errors={errors}
                                watching={watching}
                                setValue={setValue}
                                submitting
                            />
                            <Button style={styles.saveButton} onPress={onSubmit}>
                                Next
                            </Button>
                        </Form>
                    </Box>
                </KeyboardAwareScrollView>
            </LazyScreen>
        </Box>
    )

};

export default AddTenant;