import { colors } from "styles/theme";

export const styles = {
    btn: {
        backgroundColor: "#fff",
        marginTop: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 12,
        borderColor: colors['primary/50'],
        height: 48,
    },
    btnText: {
        color: colors["primary/50"],
        textAlign: "center",
        lineHeight: 24
    },
    deleteAction: {
        backgroundColor: "#fff", borderColor: "#fff", marginRight: 12, width: 36, height: 36, borderRadius: 8, borderColor: colors["gray scale/40"]
    },
    addMoreAction: {
        textStyle: { color: colors['primary/80'], fontWeight: "500", fontSize: 12 }, style: { backgroundColor: colors['primary/5'], width: 90, height: 36, borderRadius: 8, borderWidth: 0, lineHeight: 18 }
    }

}