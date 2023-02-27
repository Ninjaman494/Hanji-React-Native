import {
  ASKED_NOTIFICATION_KEY,
  getAsyncStorage,
  setAsyncStorage,
} from "utils/asyncStorageHelper";

export const hasAskedNotificationPermission = async () =>
  await getAsyncStorage(ASKED_NOTIFICATION_KEY, "boolean");

export const setAskedNotificationPermission = async (val: boolean) =>
  await setAsyncStorage(ASKED_NOTIFICATION_KEY, val);
