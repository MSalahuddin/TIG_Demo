import { input_label_16 } from "styles/reusable-classes";
import { colors } from "styles/theme";

export const style = {
    image: {
        width: 50, 
        height:50, 
        borderRadius: 10, 
    },
    placeholder: {
        backgroundColor: colors['gray scale/20'], borderColor: colors["gray scale/40"], borderWidth: 1
    },
    text:{
        alignSelf: 'center', 
        marginLeft: '5%', 
        ...input_label_16
    }
}