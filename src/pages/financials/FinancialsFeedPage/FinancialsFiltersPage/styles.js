import { styles as _styles } from "pages/tasks/TaskFiltersPage/styles"
import { colors } from "styles/theme";

export const styles = {
    ..._styles,
    dateField: { container: { width: undefined, height: undefined }, fieldsContainer: { minHeight: 108, width: "100%", paddingHorizontal: 36 } },
    bankAccountButton: {
      backgroundColor: colors['primary/50'],
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 12,
      paddingLeft: 4,
      borderRadius: 10,
    },
    bankAccountButtonIcon: {
      width: 30,
      height: 30,
    },
    bankAccountButtonText: {
      fontSize: 12,
      color: '#fff',
      marginLeft: 4,
    },
    filterContainer: {
      borderBottomWidth: 0,
      paddingBottom: 0,
    },
    actionBarLabel: {
      fontWeight: 'bold',
      color: colors['gray scale/90']
    },
    removeFliterBox: {
      borderWidth: 1, 
      borderColor: colors['gray scale/40'], 
      marginRight: 8,
    },
    removeFliterIcon: {
      width: 15,
      height: 15,
    },
    dropdownFilterBox: {
      borderWidth: 1, 
      borderColor: colors['gray scale/40'], 
      marginRight: 8,
    },
    dropdownFilterIcon: {
      width: 15,
      height: 15,
    },
    chooseButton: {
      borderColor: colors['primary/80'],
      borderWidth: 1.5,
      borderRadius: 10,
      alignSelf: 'flex-end',
      backgroundColor: 'transparent',
    },
    chooseButtonText: {
      color: colors['primary/80'],
      fontWeight: 'bold'
    },
    fieldLabelStyle: {
      fontWeight: 'bold',
      color: colors['gray scale/90'],
    },
    labelStyle: {
      textTransform: 'capitalize',
    }
}