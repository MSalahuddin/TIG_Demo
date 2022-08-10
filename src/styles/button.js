import { colors } from "./theme";
import { typography } from "./typography";


export const button_styles = {
    bordered_clear: {
        textStyle: { ...typography["buttons/large"], color: "#36796F" },
        style: { backgroundColor: "#fff", borderWidth: 2, marginTop: 7, borderRadius: 12 },
    },
    clear_grey_border: {
        textStyle: { ...typography["buttons/large"], color: colors["gray scale/30"], fontWeight: "500" },
        style: { borderColor: colors["gray scale/10"], backgroundColor: "#fff", borderWidth: 1, marginTop: 7, borderRadius: 12 },
        shadow: false
    },
    primary: {
        style: {
            backgroundColor: colors['primary/50'],
            borderColor: colors['primary/50'],
            borderRadius: 12,
        },
        textStyle: { ...typography["buttons/large"] },
        gradient: false,
        shadow: false
    },
    clear_red_border: {
        textStyle: {
            fontWeight: "500",
            fontSize: 16,
            color: colors['additional/danger']
        },
        style: {
            borderColor: colors['additional/danger'],
            borderRadius: 12,
            backgroundColor: colors['white']
        }
    },
    greyed: {
        textStyle: { ...typography["buttons/large"], color: colors["gray scale/30"], fontWeight: "500" },
        style: { borderColor: colors["gray scale/10"], backgroundColor: colors["gray scale/10"], borderWidth: 0, marginTop: 7, borderRadius: 12 },
        shadow: false
    },
}   