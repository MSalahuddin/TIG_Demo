import { colors } from "styles/theme"
export const styles = {
    mainContainer:{
        width: '100%',
        flexDirection: 'row',
        flexWrap: "wrap",
        marginTop: '5%',
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors['gray scale/20'],
        alignContent: 'space-between',
        alignItems: 'center',
    },
    textIconContainer:{
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: "5%"
    },

    checkbox:{
        width: 20, 
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
}