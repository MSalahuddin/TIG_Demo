import { colors } from "styles/theme";
const button = {
    height: 50,
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 10,
    borderWidth: 1,
}

export const styles = {
    dateField: (theme) =>  ({ 
        flexDirection: "row-reverse", 
        justifyContent: "space-between", 
        backgroundColor: theme['grey-0'], 
        borderColor: "transparent", 
        borderRadius: 12, 
        height: 48 
    }),
    saveButton: {
        ...button,
        width: '100%',
        backgroundColor: colors['primary/50'],
        borderColor: colors['primary/50'],
       },
   
    dateFieldText: { color: colors['gray scale/20'] },
    asteriks:{color: colors ['additional/danger']}
}
