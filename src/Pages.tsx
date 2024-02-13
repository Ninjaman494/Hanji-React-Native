import messaging from "@react-native-firebase/messaging";
import {
  NavigationContainerRefWithCurrent,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { addBreadcrumb } from "@sentry/react-native";
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
import React, { FC, useEffect } from "react";
import "react-native";
import { NavigationProps, PageName, StackParamList } from "typings/navigation";
import handleNotificationReceived from "utils/handleNotificationReceived";
import logEvent, { LOG_EVENT } from "utils/logEvent";

const { Navigator, Screen } = createStackNavigator<StackParamList>();

interface PagesProps {
  navRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
}

const Pages: FC<PagesProps> = ({ navRef }) => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    messaging().onNotificationOpenedApp((msg) =>
      handleNotificationReceived(msg, navigation)
    );
    messaging()
      .getInitialNotification()
      .then((msg) => msg && handleNotificationReceived(msg, navigation));
  }, [navigation]);

  return (
    <Navigator
      initialRouteName={PageName.MAIN}
      detachInactiveScreens={true}
      screenOptions={{ headerShown: false }}
      screenListeners={{
        focus: async () => {
          if (!navRef.isReady()) return;
          const route = navRef.getCurrentRoute();
          if (!route) return;

          addBreadcrumb({
            category: "navigation",
            message: `Route changed to ${route.name}`,
            level: "info",
            data: route.params,
          });

          logEvent({
            type: LOG_EVENT.SCREEN_VIEW,
            params: {
              screen_name: route.name,
              screen_class: route.name,
            },
          });
        },
      }}
    >
      <Screen name={PageName.MAIN} component={MainPage} />
      <Screen name={PageName.SEARCH} component={SearchPage} />
      <Screen
        name={PageName.DISPLAY}
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
      <Screen name={PageName.CONJUGATIONS} component={ConjugationsPage} />
      <Screen name={PageName.CONJINFO} component={ConjInfoPage} />
      <Screen name={PageName.SETTINGS} component={SettingsPage} />
      <Screen name={PageName.FAVORITES} component={FavoritesPage} />
      <Screen
        name={PageName.ACKNOWLEDGEMENTS}
        component={AcknowledgementsPage}
      />
      <Screen name={PageName.BUGREPORT} component={BugReportPage} />
      <Screen name={PageName.CONJUGATOR} component={ConjugatorPage} />
    </Navigator>
  );
};

export default Pages;
