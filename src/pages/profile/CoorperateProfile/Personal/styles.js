import { colors } from "styles/theme";

export const styles = {
    contentRow: {
        flex: 0.09,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors["gray scale/5"],
        width: "100%",
        height: 60
    },
    labelStyle: {
        fontSize: 14,
        fontWeight: "400",
    },
    dateField: (theme) =>  ({ 
        flexDirection: "row-reverse", 
        justifyContent: "space-between", 
        backgroundColor: theme['grey-0'], 
        borderColor: "transparent", 
        borderRadius: 12, 
        height: 48 
    }),
    fieldButtonText: {
        color: 'red',
    },
    dateFieldText:{}
};