import notifee from "@notifee/react-native";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

const handleBackgroundMessage = async (
  msg: FirebaseMessagingTypes.RemoteMessage
) => {
  if (msg?.data?.notifee) {
    const notification = JSON.parse(msg.data.notifee);
    if (notification.android) notification.android.smallIcon = "ic_status";
    notifee.displayNotification(notification);
  }
};

export default handleBackgroundMessage;
