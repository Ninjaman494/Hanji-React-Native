import {
  render,
  RenderAPI,
  RenderOptions,
} from "@testing-library/react-native";
import React, { FC, PropsWithChildren, ReactElement } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "theme";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderAPI => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
