import { colors } from 'styles/theme'
export const styles = {
    statItem:{
        width: '33%',
        justifyContent: 'center',
    },
    statTitle:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    markerContainer:{
        width: 10,
        height: 10,
        paddingRight: '15%'       
    },
    statTitleText:{
        alignSelf: 'center',
        fontSize: 14,
        color: colors['gray scale/90']
    },
    statValueText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: colors['gray scale/90']
    }
}