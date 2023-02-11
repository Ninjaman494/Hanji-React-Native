import { getAsyncStorage, setAsyncStorage } from "utils/asyncStorageHelper";

const KEY = "HONORIFIC_TOGGLED";

export const hasHonorificToggled = async () =>
  await getAsyncStorage(KEY, "boolean");

export const logHonorificToggled = async (toggled = true) =>
  await setAsyncStorage(KEY, toggled);
