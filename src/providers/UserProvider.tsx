import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, FC, useEffect, useState } from "react";
import Purchases, {
  PurchaserInfo,
  PurchasesError,
} from "react-native-purchases";
import getPurchaseErrorMessage from "utils/getPurchaseErrorMessage";

interface UserProviderValue {
  isAdFree: boolean;
  sessionCount: number;
}

const RESTORED_KEY = "RESTORED_PURCHASES";
const SESSIONS_KEY = "NUM_SESSIONS";

export const UserContext = createContext<UserProviderValue>({
  isAdFree: false,
  sessionCount: -1,
});

const UserProvider: FC = ({ children }) => {
  const [isAdFree, setAdFree] = useState(false);
  const [numSessions, setNumSessions] = useState(-1);

  useEffect(() => {
    (async () => {
      try {
        // Get and increment sessions count
        const sessionString = await AsyncStorage.getItem(SESSIONS_KEY);
        setNumSessions(sessionString ? parseInt(sessionString) + 1 : 1);

        // Get ad free status
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
  }, [setAdFree, setNumSessions]);

  return (
    <UserContext.Provider value={{ isAdFree, sessionCount: numSessions }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
