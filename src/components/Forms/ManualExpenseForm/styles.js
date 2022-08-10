import { colors } from "styles/theme"
export const styles = {
    header: {
        borderBottomWidth: 1,
        borderBottomColor: colors["gray scale/5"],
        width: "100%"
    },
    notesInput:{
        width: '100%',
        backgroundColor: colors["gray scale/5"],
        height: 50,
        marginTop: '5%',
        borderRadius: 10,
        justifyContent: "center",
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    enterAmountButton:{
        width:'100%' ,
        marginTop: '10%',
        backgroundColor: colors["primary/50"],
        borderRadius: 15, 
        borderColor: colors["primary/50"],
        alignSelf:'center', 
    },
}

