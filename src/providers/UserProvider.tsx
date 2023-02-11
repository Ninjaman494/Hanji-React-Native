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
import {
  getAsyncStorage,
  RESTORED_KEY,
  SESSIONS_KEY,
  setAsyncStorage,
} from "utils/asyncStorageHelper";
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
      const sessions = await getAsyncStorage(SESSIONS_KEY, "number");
      setNumSessions(sessions + 1);

      // Get ad free status
      try {
        const restoredPurchases = await getAsyncStorage(
          RESTORED_KEY,
          "boolean"
        );
        let info: CustomerInfo;
        if (restoredPurchases) {
          info = await Purchases.getCustomerInfo();
        } else {
          // Make a network call to restore purchases via Google Play/App store
          info = await Purchases.restorePurchases();
          await setAsyncStorage(RESTORED_KEY, true);
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
