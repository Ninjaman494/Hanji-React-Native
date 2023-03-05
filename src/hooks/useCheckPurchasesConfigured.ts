import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";

const MINUTE_MS = 60000;

/**
 * Hook that checks if RevenueCat's Purchases object has been
 * configured.It will check every minute until it has been
 * configured.
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
      if (!configured) setTimeout(checkPurchases, MINUTE_MS);
    };

    checkPurchases();
  }, [setConfigured]);

  return isConfigured;
};

export default useCheckPurchasesConfigured;
