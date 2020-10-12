import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Index from "./src/index";
import { StatusBar } from "expo-status-bar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "***REMOVED***",
  cache: new InMemoryCache(),
});

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3F51B5",
    accent: "#F44336",
  },
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <Index />
        <StatusBar style="auto" />
      </PaperProvider>
    </ApolloProvider>
  );
}
