import Box from 'components/Box';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import React from 'react';
import { View,} from 'react-native';
import { colors } from 'styles/theme';

const styles  = {
    defaultContainerStyles : {
        width: '90%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#FFF",
        borderRadius: 6,
        shadowOpacity: 0.1,
        elevation: 2,
        position: 'relative'
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
        color:colors['gray scale/90'],
        width: '100%'
    },
    text2: {
        fontSize: 13,
        width: '100%',
        fontWeight: 'bold',
        color:colors['gray scale/90']
    }
}
 

export const toastConfig = {

  error1: ({ text1, text2, actionButton, props }) => (
    <View style={{...styles.defaultContainerStyles, ...props?.styles?.container }}>
        <Box>
                {text1 && text1.length > 0 && (
                    <Box flexDirection="row" alignItems='center' mb={1}>
                        <Box mr={2}>{Icon('cross-filled','pm')({width:24, height:24})}</Box>
                        <Text style={{...styles.text1, ...props?.styles?.text1}}>
                            {text1}
                        </Text>
                    </Box>
                )}
                {text2 && text2.length > 0 && (<Text style={{...styles.text2, ...props?.styles?.text2}}>
                    {text2}
                </Text>)}
            {!!props.actionButton && (<Box flexDirection='row' justifyContent='flex-end' mt={3}>
                <Button style={{backgroundColor:'white'}} appearance='outline' onPress={props.actionButton?.onPress}>
                    {props.actionButton?.text}
                </Button>
            </Box>
            )}
        </Box>
    
    </View>
  )
};