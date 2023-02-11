import { getAsyncStorage, setAsyncStorage } from "utils/asyncStorageHelper";

export const isPopupShown = async (popup: string) =>
  await getAsyncStorage(getKey(popup), "number");

export const logPopupShown = async (page: string, shown = true) =>
  await setAsyncStorage(getKey(page), shown);

const getKey = (popup: string) => `${popup}_POPUP_SHOWN`;
