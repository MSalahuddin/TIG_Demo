import { colors } from "styles/theme";
import { typography } from "styles/typography";

export const styles = { 
    container: {
        borderRadius: 7,
        mx: 10,
        flexDirection: "row",
        alignItems: "center",
        marginTop: "3px",
        padding: 2,
        backgroundColor: "#fff",
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        height: 54
    },
    slashSeparator: {
        color: "#D0D2D2",
        fontSize: 14,
        fontWeight: "400",
        marginHorizontal: 2
    }, 
    header: {
        justifyContent: "flex-end",
        alignItems: "flex-start"
    },
    content: {
        height: "100%",
        paddingLeft: 16,
        alignItems: "flex-start"
    },
    tenantText: {
        color: "#727978",
        fontSize: 12,
        lineHeight: 16,
        fontWeight: 400
    }, 
    buildingTextContainer : {
        flexDirection: "row"
    },
    buildingText: {
        color: "#131F1E",
        fontSize: 14,
        fontWeight: 400
    },
    amountContainer: {
        flex: 2,
        alignItems: "flex-end",
        paddingRight: 3,
    },
    amountText: {
        fontSize: 22,
        color: "#131F1E",
        fontSize: 16,
        fontWeight: 400,
    },
    altAmountText: {
        ...typography["body/x-small – regular"],
        color: colors["gray scale/40"]
    },
    overdue: {
        ...typography["body/small – regular"]
    },
}