import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";

const MINUTE_MS = 1000;

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
    const interval = setInterval(async () => {
      const configured = await Purchases.isConfigured();
      setConfigured(configured);

      if (configured) clearInterval(interval);
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [setConfigured]);

  return isConfigured;
};

export default useCheckPurchasesConfigured;
