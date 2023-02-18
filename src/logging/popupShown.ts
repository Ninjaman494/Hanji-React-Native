import useUserContext from "hooks/useUserContext";
import { useCallback } from "react";
import { PopupName } from "typings/popup";
import {
  getAsyncStorage,
  PopupShownKey,
  setAsyncStorage,
} from "utils/asyncStorageHelper";

export const isPopupShown = async (popup: PopupName) =>
  await getAsyncStorage(getKey(popup), "boolean");

export const useLogPopupShown = () => {
  const { updateStore } = useUserContext();

  const logPopupShown = useCallback(
    async (popup: PopupName, shown = true) => {
      await setAsyncStorage(getKey(popup), shown);
      await updateStore();
    },
    [updateStore]
  );

  return logPopupShown;
};

const getKey = (popup: PopupName): PopupShownKey => `${popup}_POPUP_SHOWN`;
