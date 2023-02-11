import { getAsyncStorage, setAsyncStorage } from "utils/asyncStorageHelper";

export const getPageView = async (page: string) =>
  await getAsyncStorage(getKey(page), "number");

export const logPageView = async (page: string) => {
  const key = getKey(page);
  const visitCount = await getPageView(page);
  await setAsyncStorage(key, visitCount + 1);
};

const getKey = (page: string) => `${page}_VISIT_COUNT`;
