import analytics from "@react-native-firebase/analytics";
import messaging from "@react-native-firebase/messaging";
import { registerRootComponent } from "expo";
import "expo-dev-client";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import App from "./App";

messaging().setBackgroundMessageHandler(async (msg) => {
  console.log("BACKGROUND MSG", JSON.stringify(msg, null, 2));
});

analytics().setAnalyticsCollectionEnabled(
  process.env.NODE_ENV !== "development"
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

enableScreens(false);
