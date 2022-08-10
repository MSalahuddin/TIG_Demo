import React, { useContext, useMemo } from "react";
import Toast from 'react-native-toast-message';
import { useMutation } from "urql";

import { ScrollView, TextInput } from "react-native";
import { getActions } from "constants/actions";

import Box from "components/Box";
import Header from 'components/Header';
import Button from "components/Button";
import DateField from "../Fields/DateField";
import BuildingField from "../Fields/BuildingField";
import UnitField from "../Fields/UnitField";
import ServiceField from "../Fields/ServiceField";
import ServiceProviderField from "../Fields/ServiceProviderField";
import AttachmentField from "../Fields/AttachementField";
import AmountField from "../Fields/AmountField";
import expenseMutation from '../../../queries/financials/manualPaymentForm.gql'

import { chain } from "helpers/func";
import AuthContext from "providers/auth";
import SelectButtonInputValue from "components/SelectButtonInputValue/SelectButtonInputValue";
import { formatFileToFileInput } from 'components/Forms/Tasks/helpers.js';
import { styles } from './styles';
import { useForm } from "hooks/useForm";
import InputLabel from "components/InputLabel";
import { input_label_16 } from "styles/reusable-classes";

const requiredFields = ["due", "building", "paidAt", "service", "serviceProvider"]
const ManualExpense = ({ navigation }) => {
    const { user } = useContext(AuthContext);
    const [_, addManualExpense] = useMutation(expenseMutation);

    const { setValue, form, setForm, validateRequiredFields } = useForm({ requiredFields })
    const areFieldsFilled = useMemo(() => validateRequiredFields(), [form])

    const paymentMutation = async () => {
        try {
            const input = formatInput(form, user)
            const res = await addManualExpense({ input });
        } catch (e) {
            console.log(e)
        }
        finally {
            onSuccess()
        }
    };
    const onSuccess = chain([
        () => Toast.show({ type: "success", text1: "Successfully added expense." }),
        () => toFinancialsHome()
    ])

    const toFinancialsHome = chain([
        () => navigation.navigate("FinancialsHomePage"),
        () => setForm({})
    ])
    return (
        <>
            <Header
                alignment="center"
                title="Manual Expense"
                style={styles.header}
                actions={getActions(["back", { onPress: toFinancialsHome }])}
            />
            <Box as={ScrollView} flex={1}>
                <Box width='90%' alignSelf='center' marginTop='5%' flex={1}>
                    <DateField
                        copy={{ label: "Due Date", addLabel: "Set a Date" }}
                        icon={'date'}
                        value={form?.due}
                        onSelect={val => setValue("due", val)}
                        editable={true}
                        isRequired
                    />

                    <DateField
                        copy={{ label: "Payment Date", addLabel: "Set a Date" }}
                        icon={'date'}
                        value={form?.paidAt}
                        onSelect={val => setValue("paidAt", val)}
                        editable={true}
                        isRequired
                    />

                    <BuildingField
                        limit={1}
                        setValue={(val) => setValue("building", val)}
                        value={form?.building}
                        isRequired
                    />

                    <UnitField
                        setValue={(val) => setValue("unit", val)}
                        limit={1}
                        value={form?.unit}
                        buildingId={form?.building?.pk}
                    />

                    <ServiceField
                        setValue={(val) => setValue("service", val)}
                        value={form?.service}
                        isRequired
                    />

                    <ServiceProviderField
                        setValue={(val) => setValue("serviceProvider", val)}
                        value={form?.serviceProvider}
                        serviceId={form?.service?.id}
                        isRequired
                    />

                    <AmountField
                        setValue={(val) => setForm({ ...form, ...val })}
                        value={form?.paymentMethod && form?.amount && { paymentMethod: form?.paymentMethod, amount: form?.amount }}
                        isRequired
                    />

                    <AttachmentField
                        setValue={(val) => setValue("document", val)}
                        value={form?.document && (<SelectButtonInputValue text={form?.document[0]?.name} />)}
                    />

                    <Box marginTop='10%'>
                        <InputLabel fontWeight='bold' label="Notes" labelStyle={input_label_16}  />
                        <TextInput
                            onChangeText={(val) => setValue("description", val)}
                            value={form?.description}
                            style={styles.notesInput} />
                    </Box>
                    {
                        areFieldsFilled ?
                            <Button
                                onPress={paymentMutation}
                                style={styles.enterAmountButton}>
                                Enter Amount
                            </Button> : null
                    }

                </Box>
            </Box>
        </>
    );
};

const formatInput = (form, user) => ({
    payerId: user.pk,
    recipientId: form?.serviceProvider?.pk,
    unitId: form?.unit?.pk,
    buildingId: form?.building.pk,
    paymentMethod: form?.paymentMethod?.text?.toLowerCase(),
    due: form?.due, 
    paidAt: form?.paidAt,
    amount: form?.amount,
    description: form?.description,
    attachment: form?.document && formatFileToFileInput(form?.document?.[0])
})


export default ManualExpense;