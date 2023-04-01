import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ConjugationName, Formality, Tense } from "../utils/conjugationTypes";

const CONJUGATIONS = gql`
  query GetConjugations($input: ConjugationsInput!) {
    getConjugations(input: $input) {
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
  input: {
    stem: string;
    isAdj: boolean;
    honorific?: boolean;
    regular: boolean | undefined; // If an entry has regular it MUST be passed in
    conjugations?: {
      name: string;
      honorific: boolean;
    }[];
  };
}

type ConjugationsResponse = {
  getConjugations?: Conjugation[];
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
        data.getConjugations?.map((c) => ({
          ...c,
          speechLevel: c.speechLevel
            .toLowerCase()
            .split("_")
            .join(" ") as Formality,
        }))
      );
    }
  }, [data, setConjugations]);

  return { data: { getConjugations: conjugations }, ...rest };
};

export default useConjugations;
