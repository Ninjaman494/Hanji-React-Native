import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import handleBackgroundMessage from "utils/handleBackgroundMessage";

const setupMessaging = (): (() => void) => {
  // Required for iOS, no-op for Android
  messaging()
    .requestPermission()
    .then((authStatus) => {
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
      }
    });

  // TODO: Remove when done testing
  messaging()
    .getToken()
    .then((token) => console.log("TOKEN:", token));

  // Required on Android
  notifee.createChannel({
    id: "wod",
    name: "Word of the Day Notifications",
    description: "Get notified when there's a new Word of the Day",
  });

  const unsubscribe = messaging().onMessage(async (msg) => {
    console.log("MESSAGE RECEIVED:", JSON.stringify(msg, null, 2));
    await handleBackgroundMessage(msg);
  });

  return unsubscribe;
};

export default setupMessaging;
