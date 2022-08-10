import { colors } from "styles/theme";
import { typography } from "styles/typography";

export const styles = {
    cardHeader: {
        paddingHorizontal: 7,
        borderWidth: 1
    },
    features: {
        container: {
            justifyContent: 'center',
            width: "100%",
        },
        row: {
            height: 54,
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: colors['gray scale/10'],
            paddingHorizontal: 7,
            width: "100%"

        },
        label: {
            ...typography["body/small – regular"]
        },
        content: {
            ...typography["body/small – regular"]

        }
    }
}
