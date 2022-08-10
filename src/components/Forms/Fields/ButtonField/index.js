import React, { useCallback } from 'react';
import Icon from 'components/Icon';
import { Buttons } from "components/Dialog"
import { compact } from 'lodash';
import Button from 'components/Button';
import { t } from 'helpers/react';
import Box from 'components/Box';
import { styles } from './styles';
import Text from 'components/Text';
import { RequiredAsterisk } from 'components/Input';

const defaultBtnText = "Choose from List";

export const deleteBtnProps = { icon: Icon("delete", "pm"), shadow: false, style: styles.deleteAction }
const ButtonField = ({ copy, setValue, value, addMore = true, clearAll = true, onPress, addMoreProps, isRequired,renderValue:_renderValue, ...props }) => {
    const actions = compact([
        clearAll && value && { ...deleteBtnProps, onPress: () => setValue(null) },
        addMore && value && { children: "Add More", onPress: onPress, shadow: false, ...styles.addMoreAction, ...addMoreProps }
    ]);

    const renderValue  = useCallback((value)=> _renderValue ?  _renderValue(value) :  value)

    return (
        <Box pb={"18px"} width={"100%"}>
            <Box flexDirection={"row"} justifyContent={"space-between"} >
                {t(copy?.label, <Text fontWeight={'400'}
                    fontSize={16}>
                    {copy?.label}
                    {t(isRequired, <RequiredAsterisk/>)}
                </Text>)}
                <Buttons buttons={actions} containerStyle={{ flexDirection: "row" }} />
            </Box>
            {t(!value, <Button width={"100%"} style={styles.btn} textStyle={styles.btnText} onPress={onPress} {...props}>{copy?.btn || defaultBtnText}</Button>, renderValue(value))}
        </Box>
    )
}

export default ButtonField