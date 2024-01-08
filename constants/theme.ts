export const COLORS = {
  primaryDark: "#6970CF",
  primary: "#7880ED",
  primaryMiddle: "#BDC1F3",
  PrimaryLightBorder: "#C6C9F1",
  primaryLight: "#EBECFA",
  secondaryDark: "#CF9F69",
  secondary: "#EDB678",
  secondaryMiddle: "#F1CEA8",
  secondaryLight: "#FFF3E5",
  redDark: "#B33D3D",
  red: "#F08080",
  redMiddle: "#FACFCF",
  redLight: "#F7EDED",

  white: "#FFF",
  lightGray: "#DBDBDB",
  darkGray: "#A1A1A1",
  lightButton: "#686976",
  lightBlack: "#323341",
  black: "#000000",
  green: "#67E667",
  purple: "#C180F0",
  orange: "#E6A249",
};

export const SIZES = {
  extraSmall: 10,
  small: 16,
  font: 18,
  medium: 20,
  large: 28,
  extraLarge: 36,
};

export const FONTS = {
  regular: "MontserratRegular",
  medium: "MontserratMedium",
  bold: "MontserratBold",
  regularText: "NotoSansRegular",
  mediumText: "NotoSansMedium",
  boldText: "NotoSansBold",
};

export const SHADOWS = {
  inner: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  drop: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity:  0.20,
    shadowRadius: 5.62,
    elevation: 8
  }
};
