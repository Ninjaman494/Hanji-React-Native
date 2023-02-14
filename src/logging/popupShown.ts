import {
  getAsyncStorage,
  PopupShownKey,
  setAsyncStorage,
} from "utils/asyncStorageHelper";

export enum PopupName {
  CONJUGATIONS = "ConjugationsPopup",
}

export const isPopupShown = async (popup: PopupName) =>
  await getAsyncStorage(getKey(popup), "boolean");

export const logPopupShown = async (popup: PopupName, shown = true) =>
  await setAsyncStorage(getKey(popup), shown);

const getKey = (popup: PopupName): PopupShownKey => `${popup}_POPUP_SHOWN`;
