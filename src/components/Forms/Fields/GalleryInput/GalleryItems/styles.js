export const styles = {
    file: (theme) => ({
        height: 125,
        width: 195,
        backgroundColor: theme['grey-600']

    }),
    fileText: {
        fontSize: 18,
        lineHeight: 22
    },
    deleteIcon: {
        height: 18,
        width: 18,
    },
    deleteIconContainer: { 
        position: "absolute", 
        right: -7,
        top: -7, 
        zIndex: 10, 
        justifyContent: "center", 
        alignItems: "center",
        overflow: "hidden",
        width: 25,
        height: 25, 
        borderRadius: 18
    },
    deleteBtn: {
        justifyContent: "center", 
        alignItems: "center",
        overflow: "hidden",

        position: "relative"
    },

    fileWrapper: {
        borderRadius: 18,
        overflow:"hidden" 
    }
}