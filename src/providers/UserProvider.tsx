import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, FC, useEffect, useState } from "react";
import Purchases, {
  PurchaserInfo,
  PurchasesError,
} from "react-native-purchases";
import getPurchaseErrorMessage from "utils/getPurchaseErrorMessage";

interface UserProviderValue {
  isAdFree: boolean;
}

const RESTORED_KEY = "RESTORED_PURCHASES";

export const UserContext = createContext<UserProviderValue>({
  isAdFree: false,
});

const UserProvider: FC = ({ children }) => {
  const [isAdFree, setAdFree] = useState(false);

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
        // Use this function to only report unexpected errors
        getPurchaseErrorMessage(e as PurchasesError);
        setAdFree(false);
      }
    })();
  }, [setAdFree]);

  return (
    <UserContext.Provider value={{ isAdFree }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
