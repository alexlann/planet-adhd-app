import { COLORS, FONTS, SIZES } from "./theme";
import { Dimensions, StyleSheet } from "react-native";

export const DIMENSIONS = {
  width: Dimensions.get('window').width, //full width
  height: Dimensions.get('window').height, //full height
}

export const CARDITEMSIZE = DIMENSIONS.width * 0.27;
export const CARDITEMGAP = DIMENSIONS.width * 0.08;

// STYLES
export const buttonStyle = StyleSheet.create({
  goToButton: {
    marginLeft: "auto",
    marginRight: "5%",
    marginTop: 10,
  },
  buttonContainer: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: SIZES.small,
    right: "5%",
  },
})

export const containerStyle = StyleSheet.create({
  container: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  wrapper: {
    backgroundColor: COLORS.primaryLight,
    flex: 1,
    justifyContent: "space-between",
  },
  onBoardingWrapper: {
    backgroundColor: COLORS.primaryLight,
    flex: 1,
    justifyContent: "space-between"
  },
});

export const headerOptions = <any>{
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: COLORS.primaryLight,
  },
  headerTitleStyle: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.extraLarge,
    color: "black",
  },
}

export const modalStyle = StyleSheet.create({
  dimBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
  },
  positionWrappper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});