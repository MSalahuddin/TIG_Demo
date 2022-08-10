import { colors } from "styles/theme";

export const styles = {
    titleAppenderContainerBackdrop: {
        position: "absolute", height: "100%", width: "100%", zIndex: 2000, right: 0, backgroundColor: "#131F1E99", top: 72, 
    },
    titleAppenderContainer: {
        width: "100%", position: "absolute", zIndex: 100, flexDirection: "row", backgroundColor: "#fff", justifyContent: "center", alignItems: "center", borderWidth: 0 
    },
    titleAppenderBtn: {
        backgroundColor: colors['gray scale/5'], width: 48, width: 48, borderWidth: 0, borderRadius: 8 
    }


}