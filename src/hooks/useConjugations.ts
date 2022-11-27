import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ConjugationName, Formality, Tense } from "../utils/conjugationTypes";

const CONJUGATIONS = gql`
  query ConjugationsQuery(
    $stem: String!
    $isAdj: Boolean!
    $honorific: Boolean!
    $regular: Boolean
    $conjugations: [ConjugationInput]
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
  name: ConjugationName;
  conjugation: string;
  type: string;
  tense: Tense;
  speechLevel: Formality;
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
  conjugations?: { name: string; honorific: boolean }[];
}

type ConjugationsResponse = {
  conjugations?: Conjugation[];
};

const useConjugations = (
  vars: UseConjugationsVars,
  options?: QueryHookOptions
): QueryResult<ConjugationsResponse> => {
  const { data, ...rest } = useQuery<ConjugationsResponse>(CONJUGATIONS, {
    ...options,
    variables: vars,
  });

  const [conjugations, setConjugations] = useState<Conjugation[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (data) {
      setConjugations(
        data.conjugations?.map((c) => ({
          ...c,
          speechLevel: c.speechLevel
            .toLowerCase()
            .split("_")
            .join(" ") as Formality,
        }))
      );
    }
  }, [data, setConjugations]);

  return { data: { conjugations }, ...rest };
};

export default useConjugations;
