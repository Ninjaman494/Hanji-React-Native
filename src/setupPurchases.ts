import Purchases from "react-native-purchases";

const setupPurchases = (): void => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.configure({ apiKey: "vPfvncQAsFlSlMYgXgDCvBpPjsnQwqsi" });
};

export default setupPurchases;
