import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { NavigationProps } from "typings/navigation";

const handleNotificationReceived = (
  msg: FirebaseMessagingTypes.RemoteMessage,
  navigation: NavigationProps
) => {
  console.log("Received: ", JSON.stringify(msg, null, 2));
  if (msg.data?.type === "wod") {
    navigation.navigate("Display", { entryId: msg.data.entryId });
  }
};
export default handleNotificationReceived;
