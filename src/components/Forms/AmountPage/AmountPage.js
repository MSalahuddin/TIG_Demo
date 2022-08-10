import React, { useMemo, useState } from "react";
import { TextInput, View, Text } from "react-native";
import TabListSelect from "components/TabListSelect/TabListSelect";
import Box from "components/Box";
import Header from "components/Header";
import Button from "components/Button";
import { getActions } from 'constants/actions';
import { styles } from "./style";
import { chain } from "helpers/func";
import { useEffect } from "react";
import PaymentMethodIcon from "components/PaymentMethodIcon";
import { colors } from "styles/theme";

const getTabListData = (selectedPaymentMethod) => ([
    {
        text: "Cash",
        value: '1',
        icon: <PaymentMethodIcon method={"cash"} fill={selectedPaymentMethod?.value === "1" ? "#fff" : colors["primary/50"]} />
    },
    {
        text: "Check",
        value: '2',
        icon: <PaymentMethodIcon method={"check"} fill={selectedPaymentMethod?.value === "2"? "#fff" : colors["primary/50"]} />
    },
    {
        text: "Other",
        value: '5',
        icon: <PaymentMethodIcon method={"other"} fill={selectedPaymentMethod?.value === "5" ? "#fff" : colors["primary/50"]} />
    },
]);

const AmountPage = ({ navigation, route }) => {
    const [amount, setAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState();
    const tabListData = useMemo(() => getTabListData(paymentMethod), [paymentMethod]);

    const clearFields = chain([
        () => setAmount(''),
        () => setPaymentMethod(null),
    ])

    useEffect(() => {
        clearFields()
    } , [])

    const onSuccess = () => {
        route.params?.onDone({amount, paymentMethod})
        navigation.goBack()
    }

    return (
        <Box
            flex={1}
            backgroundColor='#fff'
        >
            <Header
                alignment="center"
                title="Enter amount"
                actions={getActions(["back", { onPress: () => navigation.goBack()}])}
            />
            <Box
                flex={1}
                justifyContent={'center'}
                marginBottom='40%'
            >
                <Box
                    width={'100%'}
                    flexDirection={'row'}
                    justifyContent='center'
                >
                    <Text style={styles.textInputDollarSign}>
                        $
                    </Text>
                    <TextInput
                        keyboardType={'decimal-pad'}
                        autoFocus={true}
                        value={amount}
                        onChangeText={setAmount}
                        blurOnSubmit={true}
                        style={styles.textInput}
                    />
                </Box>
                <View
                    style={styles.tablistContainer}
                >
                    <TabListSelect
                        buttonWidth={'30%'}
                        values={tabListData}
                        isRadio={false}
                        onPress={(selectedItem)=> setPaymentMethod(selectedItem)}
                        flexDirection={'row'}
                        currentSelectedItem={paymentMethod}
                    />
                </View>
                <Button
                    onPress={onSuccess}
                    style={styles.doneBtn}
                >
                    Done
                </Button>
            </Box>
        </Box>
    )
}

export default AmountPage