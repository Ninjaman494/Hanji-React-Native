import { wrap } from "@sentry/react-native";
import React from "react";
import "react-native-url-polyfill/auto";
import Index from "./src/index";

const App = () => {
  return <Index />;
};

export default wrap(App);
