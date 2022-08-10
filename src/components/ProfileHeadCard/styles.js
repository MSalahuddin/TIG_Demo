import { colors } from "styles/theme";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { IS_SMALLER } from "styles/responsive";

export const styles = {
    header: {
        backgroundColor: "transparent",
        marginTop: getStatusBarHeight() + (IS_SMALLER ? 0 : 7),
    },
    profileImageBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors['white'],
        marginTop: -30,
    },
    profileContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        alignItems: 'center',
        paddingBottom: 3,
        width: "100%",
        marginTop: IS_SMALLER ? -10 : 0
    },
    profileImage: {
        width: 54,
        height: 54,
    },
    profileName: {
        color: colors['gray scale/90'],
        fontSize: 12,
        marginTop: IS_SMALLER ? 2 : 3,
        fontWeight: "bold"
    },
    profileType: {
        color: colors['gray scale/40'],
        fontSize: 12,
        marginTop: -4,
        fontWeight: "400"
    },
};