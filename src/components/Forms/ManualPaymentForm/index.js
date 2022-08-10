import React, { useContext, useMemo,  useEffect } from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import { styles } from './styles';
import Header from 'components/Header';
import { getActions } from 'constants/actions';
import TabListSelect from 'components/TabListSelect/TabListSelect';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'urql';
import { ScrollView } from 'react-native-gesture-handler';
import ManualPaymentFormMutation from '../../../queries/financials/manualPaymentForm.gql'
import BuildingField from 'components/Forms/Fields/BuildingField';
import UnitField from 'components/Forms/Fields/UnitField';
import TenantField from 'components/Forms/Fields/TenantField';
import DateField from '../Fields/DateField';
import AmountField from '../Fields/AmountField';
import { TextInput } from 'react-native';
import Toast from 'react-native-toast-message';
import { chain } from 'helpers/func';
import listTenant from 'queries/tenants/listTenantsWLease.gql'
import AttachmentField from '../Fields/AttachementField';
import AuthContext from 'providers/auth';
import { formatFileToFileInput } from 'components/Forms/Tasks/helpers.js';
import { useForm } from 'hooks/useForm';
import InputLabel from 'components/InputLabel';
import { input_label_16 } from 'styles/reusable-classes';
import { noop } from 'lodash';

const tabListData = [
  { text: "Rent", value: 'Rent' },
  { text: "Other", value: 'Other' },
];

const requiredFields = ["due", "paidAt", "tenant", "building", "unit", "amount", "paymentMethod", "description"]
const ManualPayment = () => {
  const { user } = useContext(AuthContext);
  const { setValue, form, validateRequiredFields, setForm } = useForm({ requiredFields })
  const navigation = useNavigation()
  const [_, addManualPayment] = useMutation(ManualPaymentFormMutation);
  const areFieldsFilled = useMemo(() => validateRequiredFields(), [form])

  useEffect(() => {
    if (form?.paymentMethod?.text == 'Cash') {
      setValue("paidAt",form?.due)
    }
  }, [form?.paymentMethod]);

  const paymentMutation = async () => {
    try {
      const input = formatInput(form, user)
      const res = await addManualPayment({ input });
    } catch(e){
      console.log(e)
    }finally {
      onSuccess()
    }
  };

  const onSuccess = chain([
    () => Toast.show({ type: "success", text1: "Successfully added payment." }),
    () => toFinancialsHome()
  ])

  const handleOnTenantChange = (val) => {
    val && setForm({
      ...form,
      tenant: val,
      lease: val?.latestLease,
      unit: val.latestLease.unit,
      building: val.latestLease.unit.building
    })
  }

  const toFinancialsHome = chain([
    () => navigation.navigate("FinancialsHomePage"),
    () => setForm({})
  ]);

  return (
    <>
      <Header
        alignment="center"
        title="Manual Payment"
        style={styles.header}
        actions={getActions(["back", { onPress: toFinancialsHome }])}
      />
      <Box as={ScrollView} flex={1}>
        <Box width='90%' alignSelf='center' marginTop='5%'>
          <InputLabel labelStyle={input_label_16} isRequired  label={"Payment for"}/>
          <TabListSelect
            values={tabListData}
            onPress={(selectedItem) => setValue("description", selectedItem)}
            currentSelectedItem={form?.description}
            isRadio={true}
            buttonWidth={'100%'}
            flexDirection={'column'}
          />
          {form?.description?.value == 'Other' &&
            <TextInput
              autoFocus={true}
              onChangeText={val => setValue("other", val)}
              value={form?.other}
              style={styles.otherInputField} />
          }
        </Box>
        <Box width='90%' alignSelf='center' marginTop='2.5%' paddingTop='5%' paddingBottom='5%'>
          <DateField
            copy={{ label: "Due Date", addLabel: "Set a Date" }}
            icon={'date'}
            value={form?.due}
            onSelect={val => setValue("due", val)}
            editable={true}
            isRequired={true}
          />

          <DateField
            copy={{ label: "Payment Date", addLabel: "Set a Date" }}
            icon={'date'}
            value={form?.paidAt}
            onSelect={val => setValue("paidAt", val)}
            editable={true}
            isRequired={true} />

          <TenantField
            query={listTenant}
            limit={1}
            setValue={(val) => handleOnTenantChange(val)}
            value={form?.tenant}
            isRequired={true}
          />

          <BuildingField
            limit={1}
            value={form?.building}
            isRequired={true}
            setValue={noop}
            disabled
          />

          <UnitField
            limit={1}
            value={form?.unit}
            isRequired={true}
            setValue={noop}
            disabled
          />

          <AmountField
            setValue={val => setForm({...form, ...val})}
            value={form?.paymentMethod && form?.amount && { paymentMethod: form?.paymentMethod, amount: form?.amount }}
            isRequired={true}
          />

          <AttachmentField
            setValue={(val) => setValue("document", val)}
            value={form?.document}
          />

        </Box>
        {
          areFieldsFilled ?
            <Button
              onPress={paymentMutation}
              style={styles.enterAmountButton}>
              Confirm Payment
            </Button> : null
        }
      </Box>
    </>
  );
};

const formatInput = (form, user) => ({
  payerId: form?.tenant.pk,
  recipientId: user.pk,
  amount: form?.amount,
  unitId: form?.unit?.pk,
  buildingId: form?.building?.pk,
  paidAt: form?.paidAt,
  due: form?.due,
  paymentMethod: form?.paymentMethod?.text?.toLowerCase(),
  notes: form?.other || form?.description.value,
  attachment: form?.document && formatFileToFileInput(form?.document?.[0]),
  leaseId: form?.lease?.pk
});

export default ManualPayment;