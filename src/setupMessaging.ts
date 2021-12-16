import messaging from "@react-native-firebase/messaging";

const setupMessaging = () => {
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

  messaging()
    .getToken()
    .then((token) => console.log("TOKEN", token));

  const unsubscribe = messaging().onMessage(async (msg) => {
    console.log("MESSAGE RECEIVED:", JSON.stringify(msg, null, 2));
  });

  return unsubscribe;
};

export default setupMessaging;
