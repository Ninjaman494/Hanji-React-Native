export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toContainText(text: string): R;
    }
  }
  namespace ReactNativePaper {
    interface Theme {
      padding: {
        horizontal: number;
        vertical: number;
      };
      textSizes: {
        regular: number;
        secondary: number;
      };
    }
  }
}