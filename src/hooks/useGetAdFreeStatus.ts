import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Purchases, { PurchaserInfo } from "react-native-purchases";
import { Native } from "sentry-expo";

export const RESTORED_KEY = "RESTORED_PURCHASES";

const useGetAdFreeStatus = (): boolean => {
  const [isAdFree, setAdFree] = useState(true);

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
        setAdFree(false);
        Native.captureException(e, { extra: { error: e } });
      }
    })();
  }, [setAdFree]);

  return isAdFree;
};

export default useGetAdFreeStatus;
