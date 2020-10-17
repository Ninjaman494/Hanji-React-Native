import { gql, QueryHookOptions, useQuery } from "@apollo/client";

const CONJUGATIONS = gql`
  query ConjugationsQuery(
    $stem: String!
    $isAdj: Boolean!
    $honorific: Boolean!
    $regular: Boolean
    $conjugations: [String]
  ) {
    conjugations(
      stem: $stem
      isAdj: $isAdj
      honorific: $honorific
      regular: $regular
      conjugations: $conjugations
    ) {
      name
      conjugation
      type
      tense
      speechLevel
      honorific
      pronunciation
      romanization
      reasons
    }
  }
`;

export type Conjugation = {
  name: string;
  conjugation: string;
  type: string;
  tense: "PRESENT" | "PAST" | "FUTURE" | "NONE";
  speechLevel:
    | "INFORMAL_LOW"
    | "INFORMAL_HIGH"
    | "FORMAL_LOW"
    | "FORMAL_HIGH"
    | "NONE";
  honorific: boolean;
  pronunciation: string;
  romanization: string;
  reasons: string[];
};

export interface UseConjugationsVars {
  stem: string;
  isAdj: boolean;
  honorific: boolean;
  regular?: boolean;
  conjugations?: string;
}

type ConjugationsResponse = {
  conjugations: Conjugation[];
};

export interface UseConjugationsVars {
  stem: string;
  isAdj: boolean;
  honorific: boolean;
  regular?: boolean;
  conjugations?: string;
}

const useConjugations = (
  { stem, isAdj, honorific, regular, conjugations }: UseConjugationsVars,
  options?: QueryHookOptions
) => {
  return useQuery<ConjugationsResponse>(CONJUGATIONS, {
    ...options,
    variables: {
      stem: stem,
      isAdj: isAdj,
      honorific: honorific,
      regular: regular,
      conjugations: conjugations,
    },
  });
};

export default useConjugations;
