import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Conjugation } from "hooks/useConjugations";

export enum PageName {
  MAIN = "Main",
  SEARCH = "Search",
  DISPLAY = "Display",
  CONJUGATIONS = "Conjugations",
  CONJINFO = "ConjInfo",
  SETTINGS = "Settings",
  FAVORITES = "Favorites",
  ACKNOWLEDGEMENTS = "Acknowledgements",
  BUGREPORT = "BugReport",
  CONJUGATOR = "Conjugator",
}

export type StackParamList = {
  [PageName.MAIN]: undefined;
  [PageName.SEARCH]: { query: string };
  [PageName.DISPLAY]: { entryId: string; noAnimate?: boolean };
  [PageName.CONJUGATIONS]: { stem: string; isAdj: boolean; honorific: boolean };
  [PageName.CONJINFO]: { conjugation: Conjugation };
  [PageName.SETTINGS]: undefined;
  [PageName.FAVORITES]: undefined;
  [PageName.ACKNOWLEDGEMENTS]: undefined;
  [PageName.BUGREPORT]: { screenshot: string };
  [PageName.CONJUGATOR]: { term: string };
};

export type NavigationProps = StackNavigationProp<StackParamList>;

export type ScreenProps<RouteName extends keyof StackParamList> =
  StackScreenProps<StackParamList, RouteName>;
