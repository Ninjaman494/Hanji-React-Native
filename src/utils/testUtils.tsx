import {
  render,
  RenderAPI,
  RenderOptions,
} from "@testing-library/react-native";
import React, { FC, ReactElement } from "react";
import { ThemeProvider } from "react-native-paper";
import theme from "theme";

const Providers: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderAPI => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
