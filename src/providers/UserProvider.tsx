import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, FC, useEffect, useState } from "react";
import Purchases, {
  CustomerInfo,
  PurchasesError,
} from "react-native-purchases";
import getPurchaseErrorMessage from "utils/getPurchaseErrorMessage";

interface UserProviderValue {
  isAdFree: boolean;
  sessionCount: number;
  surveyState: SurveyState;
}

export enum SurveyState {
  NOT_ASKED = "NOT_ASKED",
  ASK_AGAIN = "ASK_AGAIN",
  DONT_ASK_AGAIN = "DONT_ASK_AGAIN",
}

export const RESTORED_KEY = "RESTORED_PURCHASES";
export const SESSIONS_KEY = "NUM_SESSIONS";
export const SURVEYS_KEY = "NUM_SURVEYS";

export const UserContext = createContext<UserProviderValue>({
  isAdFree: false,
  sessionCount: -1,
  surveyState: SurveyState.NOT_ASKED,
});

const UserProvider: FC = ({ children }) => {
  const [isAdFree, setAdFree] = useState(false);
  const [sessionCount, setNumSessions] = useState(-1);
  const [surveyState, setSurveyState] = useState(SurveyState.NOT_ASKED);

  useEffect(() => {
    (async () => {
      // Get and increment sessions count
      const sessionString = await AsyncStorage.getItem(SESSIONS_KEY);
      setNumSessions(sessionString ? parseInt(sessionString) + 1 : 1);

      // Get survey state
      const surveyString = await AsyncStorage.getItem(SURVEYS_KEY);
      if (!surveyString || !(surveyString in SurveyState)) {
        await AsyncStorage.setItem(SURVEYS_KEY, SurveyState.NOT_ASKED);
      } else {
        setSurveyState(surveyString as SurveyState);
      }

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
    <UserContext.Provider value={{ isAdFree, sessionCount, surveyState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
