import useUserContext from "hooks/useUserContext";
import { useCallback } from "react";
import { PageName } from "typings/navigation";
import {
  getAsyncStorage,
  PageVisitKey,
  setAsyncStorage,
} from "utils/asyncStorageHelper";

export const getPageView = async (page: PageName) =>
  await getAsyncStorage(getKey(page), "number");

export const useLogPageView = () => {
  const { updateStore } = useUserContext();

  const logPageView = useCallback(
    async (page: PageName) => {
      const key = getKey(page);
      const visitCount = await getPageView(page);
      await setAsyncStorage(key, visitCount + 1);
      await updateStore();
    },
    [updateStore]
  );

  return logPageView;
};

const getKey = (page: PageName): PageVisitKey => `${page}_VISIT_COUNT`;
