import React from "react";
import "react-native-url-polyfill/auto";
import { Native } from "sentry-expo";
import Index from "./src/index";

const App = () => {
  return <Index />;
};

export default Native.wrap(App);
