import useUserContext from "hooks/useUserContext";
import { useCallback } from "react";
import {
  getAsyncStorage,
  HONORIFIC_TOGGLED_KEY,
  setAsyncStorage,
} from "utils/asyncStorageHelper";

export const hasHonorificToggled = async () =>
  await getAsyncStorage(HONORIFIC_TOGGLED_KEY, "boolean");

export const useLogHonorificTogled = () => {
  const { updateStore } = useUserContext();

  const logHonorificToggled = useCallback(
    async (toggled: boolean) => {
      await setAsyncStorage(HONORIFIC_TOGGLED_KEY, toggled);
      await updateStore();
    },
    [updateStore]
  );

  return logHonorificToggled;
};
