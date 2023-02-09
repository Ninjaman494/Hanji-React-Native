import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Purchases, {
  CustomerInfo,
  PurchasesError,
} from "react-native-purchases";
import { RESTORED_KEY, SESSIONS_KEY } from "utils/asyncStorageKeys";
import getPurchaseErrorMessage from "utils/getPurchaseErrorMessage";

interface UserProviderValue {
  isAdFree: boolean;
  sessionCount: number;
  setAdFree: (status: boolean) => void;
}

export const UserContext = createContext<UserProviderValue>({
  isAdFree: false,
  sessionCount: -1,
  setAdFree: () => {},
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAdFree, setAdFree] = useState(false);
  const [sessionCount, setNumSessions] = useState(-1);

  useEffect(() => {
    (async () => {
      // Get and increment sessions count
      const sessionString = await AsyncStorage.getItem(SESSIONS_KEY);
      setNumSessions(sessionString ? parseInt(sessionString) + 1 : 1);

      // Get ad free status
      try {
        const restoredPurchases = await AsyncStorage.getItem(RESTORED_KEY);
        let info: CustomerInfo;
        if (restoredPurchases) {
          info = await Purchases.getCustomerInfo();
        } else {
          // Make a network call to restore purchases via Google Play/App store
          info = await Purchases.restorePurchases();
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
    <UserContext.Provider value={{ isAdFree, sessionCount, setAdFree }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
