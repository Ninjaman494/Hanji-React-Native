import { hasHonorificToggled } from "logging/honorificToggled";
import { getPageView } from "logging/pageView";
import { isPopupShown, PopupName } from "logging/popupShown";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import Purchases, {
  CustomerInfo,
  PurchasesError,
} from "react-native-purchases";
import { PageName } from "typings/navigation";
import {
  getAsyncStorage,
  RESTORED_KEY,
  SESSIONS_KEY,
  setAsyncStorage,
} from "utils/asyncStorageHelper";
import getPurchaseErrorMessage from "utils/getPurchaseErrorMessage";

type PageViewsMap = Record<PageName, number>;

type PopupOpensMap = Record<PopupName, boolean>;

interface UserProviderValue {
  isAdFree: boolean;
  sessionCount: number;
  honorificToggled: boolean;
  pageViews: PageViewsMap;
  popupOpens: PopupOpensMap;
  setAdFree: (status: boolean) => void;
  updateStore: () => Promise<void>;
}

const defaultPageViewsMap = {} as PageViewsMap;
Object.values(PageName).forEach((n) => (defaultPageViewsMap[n] = 0));

const defaultPopupMap = {} as PopupOpensMap;
Object.values(PopupName).forEach((n) => (defaultPopupMap[n] = false));

export const UserContext = createContext<UserProviderValue>({
  isAdFree: false,
  sessionCount: -1,
  honorificToggled: false,
  pageViews: defaultPageViewsMap,
  popupOpens: defaultPopupMap,
  setAdFree: () => {},
  updateStore: () => Promise.resolve(),
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAdFree, setAdFree] = useState(false);
  const [sessionCount, setNumSessions] = useState(-1);
  const [pageViews, setPageViews] = useState(defaultPageViewsMap);
  const [popupOpens, setPopupOpens] = useState(defaultPopupMap);
  const [honorificToggled, setHonorificToggled] = useState(false);

  const updateStore = useCallback(async () => {
    // Get page views
    const newPageViews = pageViews;
    Object.values(PageName).forEach(
      async (n) => (newPageViews[n] = await getPageView(n))
    );
    setPageViews(newPageViews);

    // Get popup opens
    const newPopupOpens = popupOpens;
    Object.values(PopupName).forEach(
      async (n) => (newPopupOpens[n] = await isPopupShown(n))
    );
    setPopupOpens(newPopupOpens);

    // Get honorific toggled
    const toggled = await hasHonorificToggled();
    setHonorificToggled(toggled);
  }, [setPageViews, setPopupOpens, setHonorificToggled]);

  useEffect(() => {
    (async () => {
      // Get and increment sessions count
      const sessions = await getAsyncStorage(SESSIONS_KEY, "number");
      setNumSessions(sessions + 1);

      // Setup flagging related stores
      await updateStore();

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
  }, [setNumSessions, updateStore, setAdFree]);

  return (
    <UserContext.Provider
      value={{
        isAdFree,
        sessionCount,
        pageViews,
        popupOpens,
        honorificToggled,
        setAdFree,
        updateStore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
