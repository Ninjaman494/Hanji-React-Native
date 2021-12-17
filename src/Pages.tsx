import analytics from "@react-native-firebase/analytics";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
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
import SuggestionPage from "pages/suggestions/SuggestionPage";
import React from "react";
import "react-native";
import { Native } from "sentry-expo";
import { StackParamList } from "typings/navigation";

const { Navigator, Screen } = createStackNavigator<StackParamList>();

const Pages = (): JSX.Element => {
  const navRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navRef}>
      <Navigator
        initialRouteName="Main"
        detachInactiveScreens={true}
        screenOptions={{ headerShown: false }}
        screenListeners={{
          focus: () => {
            const route = navRef.getCurrentRoute();
            Native?.addBreadcrumb({
              category: "navigation",
              message: `Route changed to ${route?.name}`,
              level: Native.Severity.Info,
              data: route?.params,
            });

            analytics().logScreenView({
              screen_name: route?.name,
              screen_class: route?.name,
            });
          },
        }}
      >
        <Screen name="Main" component={MainPage} />
        <Screen
          name="Search"
          component={SearchPage}
          options={{ animationEnabled: false }}
        />
        <Screen name="Display" component={DisplayPage} />
        <Screen name="Conjugations" component={ConjugationsPage} />
        <Screen name="ConjInfo" component={ConjInfoPage} />
        <Screen name="Settings" component={SettingsPage} />
        <Screen name="Favorites" component={FavoritesPage} />
        <Screen name="Acknowledgements" component={AcknowledgementsPage} />
        <Screen name="BugReport" component={BugReportPage} />
        <Screen name="Conjugator" component={ConjugatorPage} />
        <Screen name="Suggestion" component={SuggestionPage} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Pages;
