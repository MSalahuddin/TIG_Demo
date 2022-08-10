import Box from 'components/Box';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Input from 'components/Input';
import React, { useState } from 'react';
import { styles } from './styles';

const AppendedTextField = ({onAddition}) => {
    const [text, setText] = useState('');

    return (
        <Box style={styles.titleAppenderContainerBackdrop}>
            <Box pb="2" px={"18"} style={styles.titleAppenderContainer} >
                <Input onChangeText={setText} width={"72%"} mr={36} />
                <Button onPress={() => onAddition(text)} shadow={false} style={styles.titleAppenderBtn} icon={Icon('green-tick', "pm")} />
            </Box>
        </Box>
    )
};

export default AppendedTextField