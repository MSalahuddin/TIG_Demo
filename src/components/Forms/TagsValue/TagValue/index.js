import Box from 'components/Box';
import Text from 'components/Text';
import { t } from 'helpers/react';
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const TagValue = ({ value, onDelete, ...props }) => {
    return (
        <Box
            p="8px"
            py="1"
            mr="2"
            mb="2"
            flexDirection={"row"}
            borderColor={colors['primary/50']}
            backgroundColor={colors['primary/50']}
            borderRadius={8}
            {...props}>
            <Text color={"#fff"} style={typography['body/medium – regular']} fontWeight={"400"}>
                {value}
            </Text>
            {t(onDelete, <Box px={"10"} as={TouchableWithoutFeedback} onPress={onDelete}>
                <Text color={"#fff"} pl={"10"} fontWeight={"400"} > x </Text>
            </Box>)}
        </Box>
    )
};


export default TagValue