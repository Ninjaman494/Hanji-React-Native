import { gql, useQuery } from "@apollo/client";

export enum Formality {
  INFORMAL_LOW = "informal low",
  INFORMAL_HIGH = "informal high",
  FORMAL_LOW = "formal low",
  FORMAL_HIGH = "formal high",
}

export enum ConjugationType {
  CONNECTIVE_IF = "connective if",
  CONNECTIVE_AND = "connective and",
  CONNECTIVE_BUT = "connective but",
  DECLARATIVE_PRESENT = "declarative present",
  DECLARATIVE_PAST = "declarative past",
  DECLARATIVE_FUTURE = "declarative future",
  DETERMINER_PRESENT = "determiner present",
  DETERMINER_PAST = "determiner past",
  DETERMINER_FUTURE = "determiner future",
  IMPERATIVE = "imperative",
  INTERROGATIVE_PRESENT = "interrogative present",
  INTERROGATIVE_PAST = "interrogative past",
  NOMINAL_ING = "nominal ing",
  PROPOSITIVE = "propositive",
  SUPPOSITIVE = "suppositive",
}

export type ConjugationName =
  | ConjugationType.CONNECTIVE_IF
  | ConjugationType.CONNECTIVE_AND
  | ConjugationType.CONNECTIVE_BUT
  | ConjugationType.NOMINAL_ING
  | ConjugationType.DETERMINER_PRESENT
  | ConjugationType.DETERMINER_PAST
  | ConjugationType.DETERMINER_FUTURE
  | `${ConjugationType.DECLARATIVE_PRESENT} ${Formality}`
  | `${ConjugationType.DECLARATIVE_PAST} ${Formality}`
  | `${ConjugationType.DECLARATIVE_FUTURE} ${Formality}`
  | `${ConjugationType.IMPERATIVE} ${Formality}`
  | `${ConjugationType.INTERROGATIVE_PRESENT} ${Formality}`
  | `${ConjugationType.INTERROGATIVE_PAST} ${Formality}`
  | `${ConjugationType.PROPOSITIVE} ${Formality}`
  | `${ConjugationType.SUPPOSITIVE} ${Formality}`;

interface GetConjugationNamesResponse {
  conjugationNames: ConjugationName[];
}

const CONJUGATION_NAMES = gql`
  query ConjugationNamesQuery {
    conjugationNames
  }
`;

const useGetConjugationNames = () => {
  return useQuery<GetConjugationNamesResponse>(CONJUGATION_NAMES);
};

export default useGetConjugationNames;
