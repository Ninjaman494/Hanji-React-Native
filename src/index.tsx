import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { NativeRouter as Router, Switch, Route } from "react-router-native";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  Colors,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import DisplayPage from "pages/display/DisplayPage";
import MainPage from "pages/main/MainPage";
import SearchPage from "pages/search/SearchPage";
import ConjugationsPage from "pages/conjugations/ConjugationsPage";
import ConjInfoPage from "pages/conjInfo/ConjInfoPage";
import SettingsPage from "pages/settings/SettingsPage";
import FavoritesPage from "pages/favorites/FavoritesPage";
import AcknowledgementsPage from "pages/settings/AcknowledgementsPage";
import RatingHandler from "components/RatingHandler";
import ViewShotProvider from "components/ViewShotProvider";
import BugReportPage from "pages/bugReport/BugReportPage";

const client = new ApolloClient({
  uri: "https://hanji-server.appspot.com/graphql",
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
    grey: Colors.grey600,
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
        <ViewShotProvider>
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
                  <Route
                    exact
                    path="/conjugation"
                    component={ConjugationsPage}
                  />
                  <Route exact path="/conjinfo" component={ConjInfoPage} />
                  <Route exact path="/settings" component={SettingsPage} />
                  <Route exact path="/favorites" component={FavoritesPage} />
                  <Route
                    exact
                    path="/acknowledgements"
                    component={AcknowledgementsPage}
                  />
                  <Route exact path="/bugReport" component={BugReportPage} />
                </Switch>
              </Router>
            </View>
          </View>
        </ViewShotProvider>
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
    marginTop: StatusBar.currentHeight ?? 0,
  },
  container: {
    flex: 1,
  },
});
