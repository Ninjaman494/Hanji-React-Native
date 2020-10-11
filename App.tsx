import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Index from "./src/index";
import {StatusBar} from "expo-status-bar";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://hanji-server.appspot.com/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <Index/>
        <StatusBar style="auto" />
      </PaperProvider>
    </ApolloProvider>
  );
}
