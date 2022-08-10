import { colors } from "styles/theme";

export const styles = {
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#CFD8DC", 
        width: "100%"
    },
    enterAmountButton:{
        width:'90%' ,
        backgroundColor:'#36796F', 
        borderRadius: 15, 
        borderColor:'#36796F', 
        alignSelf:'center', 
    },
    otherInputField:{
        width: '100%',
        backgroundColor: '#F0F2F2',
        height: 50,
        marginTop: '5%',
        borderRadius: 10,
        justifyContent: "center",
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    asteriks:{
        color: colors ['additional/danger']
    }
}

