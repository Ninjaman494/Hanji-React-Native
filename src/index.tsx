import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SERVER_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import analytics from "@react-native-firebase/analytics";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import Pages from "Pages";
import { createUploadLink } from "apollo-upload-client";
import { nativeBuildVersion } from "expo-application";
import { StatusBar } from "expo-status-bar";
import useCheckNetInfo from "hooks/useCheckNetInfo";
import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import { DEFAULT_FAVORITES } from "pages/main/MainPage";
import ChangeLog from "providers/ChangeLog";
import RatingHandler from "providers/RatingHandler";
import SnackbarProvider from "providers/SnackbarProvider";
import UserProvider from "providers/UserProvider";
import ViewShotProvider from "providers/ViewShotProvider";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Purchases from "react-native-purchases";
import uuid from "react-native-uuid";
import setupMessaging from "setupMessaging";
import setupPurchases from "setupPurchases";
import setupSentry from "setupSentry";
import theme from "theme";
import { USER_ID_KEY, getAsyncStorage } from "utils/asyncStorageHelper";
import setupAds from "utils/setupAds";

const client = new ApolloClient({
  link: createUploadLink({
    uri: SERVER_URL,
    headers: { "apollo-require-preflight": true },
  }),
  cache: new InMemoryCache(),
});

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

export default function Index(): JSX.Element {
  const { favorites, loading, error } = useGetFavorites();
  const { setFavorites } = useSetFavorites();
  const netInfo = useCheckNetInfo();
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    // We need internet to setup third-party APIs, and should
    // only setup once
    if (!netInfo?.isInternetReachable || setupComplete) return;

    if (Platform.OS === "android" || Platform.OS === "ios") {
      setupSentry(routingInstrumentation);
      setupPurchases();
      setupAds();
      setupMessaging();
    }

    (async () => {
      let id = await getAsyncStorage(USER_ID_KEY, "string");
      if (!id) {
        id = uuid.v4().toString();
        await AsyncStorage.setItem(USER_ID_KEY, id);
      }
      Sentry?.setUser({ id });
      await Purchases.logIn(id);
      await analytics().setUserId(id);
    })();

    setSetupComplete(true);
  }, [netInfo]);

  useEffect(() => {
    if (favorites === null && !loading && !error) {
      setFavorites(DEFAULT_FAVORITES);
      Sentry?.setContext("Favorites", { favorites: DEFAULT_FAVORITES });
    } else if (favorites) {
      Sentry?.setContext("Favorites", { favorites });
    }
  }, [favorites, loading, error, DEFAULT_FAVORITES, setFavorites]);

  const navRef = useNavigationContainerRef();

  return (
    <ApolloProvider client={client}>
      <ViewShotProvider>
        <UserProvider>
          <NavigationContainer
            ref={navRef}
            onReady={() =>
              routingInstrumentation.registerNavigationContainer(navRef)
            }
          >
            <View style={styles.parent}>
              <StatusBar
                backgroundColor={theme.colors.primaryDark}
                style="light"
              />
              <PaperProvider theme={theme}>
                <SnackbarProvider>
                  <ChangeLog currentVersion={nativeBuildVersion as string} />
                  <RatingHandler numSessions={5} />
                  <View style={styles.container}>
                    <Pages navRef={navRef} />
                  </View>
                </SnackbarProvider>
              </PaperProvider>
            </View>
          </NavigationContainer>
        </UserProvider>
      </ViewShotProvider>
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
