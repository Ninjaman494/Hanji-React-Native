import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import handleBackgroundMessage from "utils/handleBackgroundMessage";

const setupMessaging = (): (() => void) => {
  // TODO: Remove when done testing
  messaging()
    .getToken()
    .then((token) => console.log("TOKEN:", token));

  // Required on Android
  notifee.createChannel({
    id: "wod",
    name: "Word of the Day",
    description: "Get notified when there's a new Word of the Day",
  });

  const unsubscribe = messaging().onMessage(async (msg) => {
    console.log("MESSAGE RECEIVED:", JSON.stringify(msg, null, 2));
    await handleBackgroundMessage(msg);
  });

  return unsubscribe;
};

export default setupMessaging;
