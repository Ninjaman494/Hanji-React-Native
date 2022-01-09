import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Purchases, {
  PurchaserInfo,
  PurchasesError,
} from "react-native-purchases";
import getPurchaseErrorMessage from "utils/getPurchaseErrorMessage";

export const RESTORED_KEY = "RESTORED_PURCHASES";

const useGetAdFreeStatus = (): { isAdFree: boolean; error?: string } => {
  const [isAdFree, setAdFree] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const restoredPurchases = await AsyncStorage.getItem(RESTORED_KEY);

        let info: PurchaserInfo;
        if (restoredPurchases) {
          info = await Purchases.getPurchaserInfo();
        } else {
          // Make a network call to restore purchases via Google Play/App store
          info = await Purchases.restoreTransactions();
          await AsyncStorage.setItem(RESTORED_KEY, "true");
        }

        setAdFree(!!info.entitlements.active.ad_free_entitlement);
      } catch (e) {
        const errorMsg = getPurchaseErrorMessage(e as PurchasesError);
        setError(errorMsg);
        setAdFree(false);
      }
    })();
  }, [setAdFree]);

  return { isAdFree, error };
};

export default useGetAdFreeStatus;
