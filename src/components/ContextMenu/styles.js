import { typography } from "styles/typography";
import { IS_SMALLER } from "styles/responsive";

export const styles = {
   touchableContainer: {
      width: '98%',
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingBottom: '5%',
      paddingTop: '5%',
   },
   text: {
      marginLeft: '3%',
      ...typography['body/medium – regular']
   },
   headerTxt: {
      ...typography["Capital/small – medium"],
      ...(IS_SMALLER && { fontSize: 14 })
   },
   iconStyle: { width: 18, height: 18, fill: '#000' },
}