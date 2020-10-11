import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Index from "./src/index";
import {StatusBar} from "expo-status-bar";

export default function App() {
  return (
    <PaperProvider>
      <Index/>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
