import React from "react";
import Index from "./src/index";
import { StatusBar } from "expo-status-bar";
import "react-native-url-polyfill/auto";

export default function App() {
  return (
    <>
      <Index />
      <StatusBar style="auto" />
    </>
  );
}
