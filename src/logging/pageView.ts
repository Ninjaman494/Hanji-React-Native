import { PageName } from "typings/navigation";
import {
  getAsyncStorage,
  PageVisitKey,
  setAsyncStorage,
} from "utils/asyncStorageHelper";

export const getPageView = async (page: PageName) =>
  await getAsyncStorage(getKey(page), "number");

export const logPageView = async (page: PageName) => {
  const key = getKey(page);
  const visitCount = await getPageView(page);
  await setAsyncStorage(key, visitCount + 1);
};

const getKey = (page: PageName): PageVisitKey => `${page}_VISIT_COUNT`;
