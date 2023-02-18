import { PopupName } from "logging/popupShown";
import { createContext, useContext } from "react";
import { PageName } from "typings/navigation";

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

const useUserContext = () => useContext(UserContext);

export default useUserContext;
