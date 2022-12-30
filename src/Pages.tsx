import { NavigationContainerRefWithCurrent } from "@react-navigation/native";
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
import SurveyPage from "pages/survey/SurveyPage";
import React, { FC } from "react";
import "react-native";
import { Native } from "sentry-expo";
import { StackParamList } from "typings/navigation";
import logEvent, { LOG_EVENT } from "utils/logEvent";

const { Navigator, Screen } = createStackNavigator<StackParamList>();

interface PagesProps {
  navRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
}

const Pages: FC<PagesProps> = ({ navRef }) => {
  return (
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
            level: "info",
            data: route?.params,
          });

          logEvent({
            type: LOG_EVENT.SCREEN_VIEW,
            params: {
              screen_name: route?.name,
              screen_class: route?.name,
            },
          });
        },
      }}
    >
      <Screen name="Main" component={MainPage} />
      <Screen name="Search" component={SearchPage} />
      <Screen
        name="Display"
        component={DisplayPage}
        options={({ route: { params } }) => ({
          transitionSpec: {
            open: {
              animation: "timing",
              config: { duration: params.noAnimate ? 0 : 250 },
            },
            close: {
              animation: "timing",
              config: { duration: 250 },
            },
          },
        })}
      />
      <Screen name="Conjugations" component={ConjugationsPage} />
      <Screen name="ConjInfo" component={ConjInfoPage} />
      <Screen name="Settings" component={SettingsPage} />
      <Screen name="Favorites" component={FavoritesPage} />
      <Screen name="Acknowledgements" component={AcknowledgementsPage} />
      <Screen name="BugReport" component={BugReportPage} />
      <Screen name="Conjugator" component={ConjugatorPage} />
      <Screen name="Survey" component={SurveyPage} />
    </Navigator>
  );
};

export default Pages;
