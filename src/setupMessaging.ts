import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";

const setupMessaging = () => {
  (async () => {
    await messaging().subscribeToTopic("all");

    // Required on Android
    await notifee.createChannel({
      id: "wod",
      name: "Word of the Day",
      description: "Get notified when there's a new Word of the Day",
    });
  })();
};

export default setupMessaging;
