import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Conjugation } from "hooks/useConjugations";

export type StackParamList = {
  Main: undefined;
  Search: { query: string };
  Display: { entryId: string; noAnimate?: boolean };
  Conjugations: { stem: string; isAdj: boolean; honorific: boolean };
  ConjInfo: { conjugation: Conjugation };
  Settings: undefined;
  Favorites: undefined;
  Acknowledgements: undefined;
  BugReport: { screenshot: string };
  Conjugator: { term: string };
  Suggestion: { entryId: string };
};

export type NavigationProps = StackNavigationProp<StackParamList>;

export type ScreenProps<RouteName extends keyof StackParamList> =
  StackScreenProps<StackParamList, RouteName>;
