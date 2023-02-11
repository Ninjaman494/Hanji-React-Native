import { Route } from "@react-navigation/native";
import { getAsyncStorage, setAsyncStorage } from "utils/asyncStorageHelper";

const logPageView = async (route: Route<string, object | undefined>) => {
  const pageViewKey = `${route.name}_VISIT_COUNT`;
  const visitCount = await getAsyncStorage(pageViewKey, "number");
  await setAsyncStorage(pageViewKey, visitCount + 1);
};

export default logPageView;
