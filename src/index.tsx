import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
// @ts-ignore
import { Router, Switch, Route } from "routing";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import DisplayPage from "pages/display/DisplayPage";
import MainPage from "pages/main/MainPage";
import SearchPage from "pages/search/SearchPage";
import ConjugationsPage from "pages/conjugations/ConjugationsPage";
import ConjInfoPage from "pages/conjInfo/ConjInfoPage";
import SettingsPage from "pages/settings/SettingsPage";
import FavoritesPage from "pages/favorites/FavoritesPage";
import AcknowledgementsPage from "pages/settings/AcknowledgementsPage";
import RatingHandler from "components/RatingHandler";

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
    primaryDark: "#303F9F",
    accent: "#F44336",
  },
  padding: {
    horizontal: 16,
    vertical: 8,
  },
  textSizes: {
    regular: 20,
    secondary: 16,
    cardTitle: 16,
  },
};

export default function Index(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <StatusBar
          backgroundColor={theme.colors.primaryDark}
          barStyle="default"
        />
        <View style={styles.parent}>
          <RatingHandler numSessions={5} />
          <View style={styles.container}>
            <Router>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/search" component={SearchPage} />
                <Route exact path="/display" component={DisplayPage} />
                <Route exact path="/conjugation" component={ConjugationsPage} />
                <Route exact path="/conjinfo" component={ConjInfoPage} />
                <Route exact path="/settings" component={SettingsPage} />
                <Route exact path="/favorites" component={FavoritesPage} />
                <Route
                  exact
                  path="/acknowledgements"
                  component={AcknowledgementsPage}
                />
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
