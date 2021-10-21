import React from "react";
import "react-native-url-polyfill/auto";
import { NativeRouter } from "react-router-native";
import Index from "./src/index";

export default function App(): JSX.Element {
  return (
    <NativeRouter>
      <Index />
    </NativeRouter>
  );
}
