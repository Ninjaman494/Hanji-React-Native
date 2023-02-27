import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  hasAskedNotificationPermission,
  setAskedNotificationPermission,
} from "logging/notificationsPermission";
import { ASKED_NOTIFICATION_KEY } from "utils/asyncStorageHelper";

jest.mock("@react-native-async-storage/async-storage");

(AsyncStorage.getItem as jest.Mock).mockResolvedValue("true");

describe("notificationsPermission", () => {
  it("fetches if notification permission has been asked", async () => {
    const hasAsked = await hasAskedNotificationPermission();
    expect(hasAsked).toBe(true);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(ASKED_NOTIFICATION_KEY);
  });

  it("sets notification permission ask status", async () => {
    await setAskedNotificationPermission(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      ASKED_NOTIFICATION_KEY,
      "true"
    );
  });
});
