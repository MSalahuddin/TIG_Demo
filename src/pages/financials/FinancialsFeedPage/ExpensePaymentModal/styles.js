import { colors } from "styles/theme";

export const styles = {
    styledLine: { position: "relative", width: "27%", height: 1, top: undefined, borderBottomWidth: 0, borderColor: colors['gray scale/10'] },
    secHeadContainer: {
        justifyContent: 'center',
        marginTop: '10%'
      },
      secHeadRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      secHeadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 1,
      },
      secHeadButtonIcon: {
        width: 70,
        height: 70,
      },
      secHeadButtonText: {
        fontSize: 12,
        marginTop: 8,
      },
}
