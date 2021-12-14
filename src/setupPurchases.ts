import Purchases from "react-native-purchases";

const setupPurchases = (): void => {
  Purchases.setDebugLogsEnabled(true);
  Purchases.setup("vPfvncQAsFlSlMYgXgDCvBpPjsnQwqsi");
};

export default setupPurchases;
