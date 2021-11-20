import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { createUploadLink } from "apollo-upload-client";
import RatingHandler from "components/RatingHandler";
import SnackbarProvider from "components/SnackbarProvider";
import ViewShotProvider from "components/ViewShotProvider";
import { StatusBar } from "expo-status-bar";
import { reloadAsync } from "expo-updates";
import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import BugReportPage from "pages/bugReport/BugReportPage";
import ConjInfoPage from "pages/conjInfo/ConjInfoPage";
import ConjugationsPage from "pages/conjugations/ConjugationsPage";
import ConjugatorPage from "pages/conjugator/ConjugatorPage";
import DisplayPage from "pages/display/DisplayPage";
import FavoritesPage from "pages/favorites/FavoritesPage";
import MainPage, { DEFAULT_FAVORITES } from "pages/main/MainPage";
import SearchPage from "pages/search/SearchPage";
import AcknowledgementsPage from "pages/settings/AcknowledgementsPage";
import SettingsPage from "pages/settings/SettingsPage";
import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import { Provider as PaperProvider } from "react-native-paper";
import uuid from "react-native-uuid";
import { init, Native } from "sentry-expo";
import theme from "theme";
import { StackParamList } from "typings/navigation";

const { Navigator, Screen } = createStackNavigator<StackParamList>();

const client = new ApolloClient({
  link: createUploadLink({
    uri: SERVER_URL,
  }),
  cache: new InMemoryCache(),
});

init({
  dsn: "https://b0c3c2bae79f4bbcbdbfdf9f3b8cc479@o1034119.ingest.sentry.io/6000706",
  beforeBreadcrumb(breadcrumb, hint) {
    if (breadcrumb.category === "xhr") {
      breadcrumb.data = JSON.parse(hint?.input);
    }
    return breadcrumb;
  },
  // enableInExpoDevelopment: true,
  // debug: true, // log debug info in dev mode
});

const USER_ID_KEY = "USER_ID";

// Global error handlers
const { Fatal, Error } = Native.Severity;
setJSExceptionHandler((error, isFatal) => {
  Native.captureException(error, {
    level: isFatal ? Fatal : Error,
  });

  Alert.alert(
    "Unexpected Error",
    "An unexpected error occured. We will need to restart the app.",
    [
      {
        text: "Restart",
        onPress: async () => await reloadAsync(),
      },
    ]
  );
}, false);
setNativeExceptionHandler(
  (errStr) => Native.captureException(errStr, { level: Fatal }),
  false,
  true
);

export default function Index(): JSX.Element {
  // const location = useLocation();
  const { favorites, loading, error } = useGetFavorites();
  const { setFavorites } = useSetFavorites();

  useEffect(() => {
    (async () => {
      let id = await AsyncStorage.getItem(USER_ID_KEY);
      if (!id) {
        id = uuid.v4().toString();
        await AsyncStorage.setItem(USER_ID_KEY, id);
      }
      Native.setUser({ id });
    })();
  }, []);

  // useEffect(() => {
  //   Native.addBreadcrumb({
  //     category: "navigation",
  //     message: `Route changed to ${location.pathname}`,
  //     level: Native.Severity.Info,
  //     data: location,
  //   });
  // }, [location]);

  useEffect(() => {
    if (favorites === null && !loading && !error) {
      setFavorites(DEFAULT_FAVORITES);
      Native.setContext("Favorites", { favorites: DEFAULT_FAVORITES });
    } else if (favorites) {
      Native.setContext("Favorites", { favorites });
    }
  }, [favorites, loading, error, DEFAULT_FAVORITES, setFavorites]);

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
                <Navigator
                  initialRouteName="Main"
                  screenOptions={{ headerShown: false }}
                >
                  <Screen
                    name="Main"
                    component={MainPage}
                    options={{ animationEnabled: false }}
                  />
                  <Screen
                    name="Search"
                    component={SearchPage}
                    options={{ animationEnabled: false }}
                  />
                  <Screen
                    name="Display"
                    component={DisplayPage}
                    options={{ animationEnabled: false }}
                  />
                  <Screen
                    name="Conjugations"
                    component={ConjugationsPage}
                    options={{ animationEnabled: false }}
                  />
                  <Screen
                    name="ConjInfo"
                    component={ConjInfoPage}
                    options={{ animationEnabled: false }}
                  />
                  <Screen name="Settings" component={SettingsPage} />
                  <Screen name="Favorites" component={FavoritesPage} />
                  <Screen
                    name="Acknowledgements"
                    component={AcknowledgementsPage}
                  />
                  <Screen name="BugReport" component={BugReportPage} />
                  <Screen name="Conjugator" component={ConjugatorPage} />
                </Navigator>
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
