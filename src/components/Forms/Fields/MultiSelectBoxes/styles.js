import { PixelRatio } from 'react-native';
import { colors } from "styles/theme";

var FONTSIZE = ((PixelRatio.get() <= 2) ? 12 : 16)

export const styles = {
    optionsContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 1,
        // justifyContent: "space-between",
    },
    option: {
        borderWidth: 2,
        borderRadius: 12, 
        borderColor: colors['gray scale/20'],
    },
    activeOption: (color) =>  ({
        color, 
        borderColor: color,
        backgroundColor: colors['primary/50'], 
        borderColor: "transparent"
    }),
    optionText: {
        letterSpacing: 1.2, 
        marginHorizontal: 3, 
        fontWeight: '400', 
        fontSize: FONTSIZE,
    },
    activeOptionText: (color) => ({
        color, 
        borderColor: color,
        color: "#fff", 
        fontWeight: "400" 
    })
}