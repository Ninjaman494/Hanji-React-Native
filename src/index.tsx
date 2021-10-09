import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import RatingHandler from "components/RatingHandler";
import SnackbarProvider from "components/SnackbarProvider";
import ViewShotProvider from "components/ViewShotProvider";
import { StatusBar } from "expo-status-bar";
import BugReportPage from "pages/bugReport/BugReportPage";
import ConjInfoPage from "pages/conjInfo/ConjInfoPage";
import ConjugationsPage from "pages/conjugations/ConjugationsPage";
import ConjugatorPage from "pages/conjugator/ConjugatorPage";
import DisplayPage from "pages/display/DisplayPage";
import FavoritesPage from "pages/favorites/FavoritesPage";
import MainPage from "pages/main/MainPage";
import SearchPage from "pages/search/SearchPage";
import AcknowledgementsPage from "pages/settings/AcknowledgementsPage";
import SettingsPage from "pages/settings/SettingsPage";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import uuid from "react-native-uuid";
import {
  BackButton,
  NativeRouter as Router,
  Route,
  Switch,
} from "react-router-native";
import theme from "theme";

const client = new ApolloClient({
  link: createUploadLink({
    uri: SERVER_URL,
  }),
  cache: new InMemoryCache(),
});

const USER_ID_KEY = "USER_ID";

export default function Index(): JSX.Element {
  useEffect(() => {
    (async () => {
      let id = await AsyncStorage.getItem(USER_ID_KEY);
      if (!id) {
        id = uuid.v4().toString();
        await AsyncStorage.setItem(USER_ID_KEY, id);
      }
    })();
  }, []);

  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <ViewShotProvider>
          <View style={styles.parent}>
            <StatusBar
              backgroundColor={theme.colors.primaryDark}
              style="light"
            />
            <SnackbarProvider>
              <RatingHandler numSessions={5} />
              <View style={styles.container}>
                <Router>
                  <BackButton />
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
                    <Route
                      exact
                      path="/conjugator"
                      component={ConjugatorPage}
                    />
                  </Switch>
                </Router>
              </View>
            </SnackbarProvider>
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
  },
  container: {
    flex: 1,
  },
});
