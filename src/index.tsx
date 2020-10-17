import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
// @ts-ignore
import { Router, Switch, Route } from "./routing";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import DisplayPage from "./display/DisplayPage";
import MainPage from "./main/MainPage";
import SearchPage from "./search/SearchPage";
import ConjugationsPage from "./conjugations/ConjugationsPage";

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
  padding: {
    horizontal: 16,
    vertical: 8,
  },
  textSizes: {
    regular: 20,
    secondary: 18,
    cardTitle: 18,
  },
};

export default function Index() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="default" />
        <View style={styles.parent}>
          <View style={styles.container}>
            <Router>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/search" component={SearchPage} />
                <Route exact path="/display" component={DisplayPage} />
                <Route exact path="/conjugation" component={ConjugationsPage} />
              </Switch>
            </Router>
          </View>
        </View>
      </PaperProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    maxWidth: 500,
  },
});
