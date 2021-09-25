import { Colors, DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3F51B5",
    primaryLight: "#B7BEFF",
    primaryDark: "#303F9F",
    accent: "#F44336",
    grey: Colors.grey600,
  },
  padding: {
    horizontal: 16,
    vertical: 8,
  },
  textSizes: {
    regular: 20,
    secondary: 16,
    cardTitle: 16,
  },
};

export default theme;
