import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";

const SECOND_MS = 1000;

/**
 * Hook that checks if RevenueCat's Purchases object has been
 * configured. It will check every second until it has been
 * configured. **NOTE:** Refreshes don't cause a re-render if
 * the value is the same
 *
 * @returns true if RevenueCat's Purchases object is configured,
 * false otherwise
 */
const useCheckPurchasesConfigured = () => {
  const [isConfigured, setConfigured] = useState(false);

  useEffect(() => {
    const checkPurchases = async () => {
      const configured = await Purchases.isConfigured();
      setConfigured(configured);
      setTimeout(checkPurchases, SECOND_MS);
    };

    checkPurchases();
  }, [setConfigured]);

  return isConfigured;
};

export default useCheckPurchasesConfigured;
