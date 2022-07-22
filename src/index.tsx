import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import analytics from "@react-native-firebase/analytics";
import { createUploadLink } from "apollo-upload-client";
import { nativeBuildVersion } from "expo-application";
import { StatusBar } from "expo-status-bar";
import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import Pages from "Pages";
import { DEFAULT_FAVORITES } from "pages/main/MainPage";
import AnimationProvider from "providers/AnimationProvider";
import ChangeLog from "providers/ChangeLog";
import RatingHandler from "providers/RatingHandler";
import SnackbarProvider from "providers/SnackbarProvider";
import SurveyHandler from "providers/SurveyHandler";
import UserProvider from "providers/UserProvider";
import ViewShotProvider from "providers/ViewShotProvider";
import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Purchases from "react-native-purchases";
import uuid from "react-native-uuid";
import { Native } from "sentry-expo";
import setupMessaging from "setupMessaging";
import setupPurchases from "setupPurchases";
import setupSentry from "setupSentry";
import theme from "theme";
import setupAds from "utils/setupAds";

const client = new ApolloClient({
  link: createUploadLink({ uri: SERVER_URL }),
  cache: new InMemoryCache(),
});

const USER_ID_KEY = "USER_ID";

export default function Index(): JSX.Element {
  const { favorites, loading, error } = useGetFavorites();
  const { setFavorites } = useSetFavorites();

  useEffect(() => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      setupSentry();
      setupPurchases();
      setupAds();
    }

    (async () => {
      let id = await AsyncStorage.getItem(USER_ID_KEY);
      if (!id) {
        id = uuid.v4().toString();
        await AsyncStorage.setItem(USER_ID_KEY, id);
      }
      Native?.setUser({ id });
      await Purchases.logIn(id);
      await analytics().setUserId(id);
    })();

    return setupMessaging();
  }, []);

  useEffect(() => {
    if (favorites === null && !loading && !error) {
      setFavorites(DEFAULT_FAVORITES);
      Native?.setContext("Favorites", { favorites: DEFAULT_FAVORITES });
    } else if (favorites) {
      Native?.setContext("Favorites", { favorites });
    }
  }, [favorites, loading, error, DEFAULT_FAVORITES, setFavorites]);

  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <ViewShotProvider>
          <UserProvider>
            <View style={styles.parent}>
              <StatusBar
                backgroundColor={theme.colors.primaryDark}
                style="light"
              />
              <SnackbarProvider>
                <AnimationProvider>
                  <RatingHandler numSessions={5} />
                  <ChangeLog currentVersion={nativeBuildVersion as string} />
                  <View style={styles.container}>
                    <SurveyHandler />
                    <Pages />
                  </View>
                </AnimationProvider>
              </SnackbarProvider>
            </View>
          </UserProvider>
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
