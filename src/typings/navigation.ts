import { StackNavigationProp } from "@react-navigation/stack";
import { Conjugation } from "hooks/useConjugations";

export type StackParamList = {
  Main: undefined;
  Search: { query: string };
  Display: { entryId: string };
  Conjugations: { stem: string; isAdj: boolean; honorific: boolean };
  ConjInfo: { conjugation: Conjugation };
  Settings: undefined;
  Favorites: undefined;
  Acknowledgements: undefined;
  BugReport: { screenshot: string };
  Conjugator: { term: string };
};

export type NavigationProp = StackNavigationProp<StackParamList>;
