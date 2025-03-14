export {};
declare module "@react-native-async-storage/async-storage/jest/async-storage-mock";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      primaryLight: string;
      primaryDark: string;
      grey: string;
    }

    interface Theme {
      padding: {
        horizontal: number;
        vertical: number;
      };
      textSizes: {
        regular: number;
        secondary: number;
        cardTitle: number;
      };
    }
  }
}
