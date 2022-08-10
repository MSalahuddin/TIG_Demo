const paddingMarginBorderRadius = 10
const fontSize = 18
const height = 50

export const styles = {
    mainContainer: {
      height: height,
      marginTop: '5%',
      justifyContent: "center",
      paddingLeft: paddingMarginBorderRadius,
      paddingRight: paddingMarginBorderRadius,
      borderRadius: paddingMarginBorderRadius,
      borderColor: '#E7E9E9',
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    mainContainerActive:{
      height: height,
      marginTop: '5%',
      justifyContent: "center",
      paddingLeft: paddingMarginBorderRadius,
      paddingRight: paddingMarginBorderRadius,
      borderRadius: paddingMarginBorderRadius,
      backgroundColor: '#36796F',
      flexDirection: "row",
      alignItems: "center",
    },
    radioButtonIcon: {
      borderWidth: 1,
      borderColor: "#A1A5A5",
      height: height/2,
      width: height/2,
      borderRadius: 25 / 2,
      marginRight: paddingMarginBorderRadius,
      alignItems: "center",
      justifyContent: "center",
    },
    radioButtonIconActive:{
      backgroundColor: "#36796F",
      borderWidth: 1,
      borderColor: "#fff",
      height: height/2,
      width: height/2,
      borderRadius: height,
      marginRight: paddingMarginBorderRadius,
      alignItems: "center",
      justifyContent: "center",
    },
    radioButtonIconInnerIcon: {
      height: 15,
      width: 15,
      backgroundColor: "#fff",
      borderRadius: 15 / 2,
      borderWidth: 3,
      borderColor: "#36796F",
    },
    radioButtonTextContainer: {
      flex: 5,
      height: height,
      justifyContent: "center",
      paddingLeft: paddingMarginBorderRadius,
    },
    radioButtonText: {
      color: '#131F1E',
      fontSize: fontSize,
    },
    radioButtonTextActive: {
      color: '#fff',
      fontSize: fontSize,
    },
}

