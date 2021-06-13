export enum Tense {
  PRESENT,
  PAST,
  FUTURE,
  NONE,
}

export enum Formality {
  INFORMAL_LOW = "informal low",
  INFORMAL_HIGH = "informal high",
  FORMAL_LOW = "formal low",
  FORMAL_HIGH = "formal high",
  NONE = "none",
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

type FormalityMinusNone = Exclude<Formality, Formality.NONE>;

export type ConjugationName =
  | ConjugationType.CONNECTIVE_IF
  | ConjugationType.CONNECTIVE_AND
  | ConjugationType.CONNECTIVE_BUT
  | ConjugationType.NOMINAL_ING
  | ConjugationType.DETERMINER_PRESENT
  | ConjugationType.DETERMINER_PAST
  | ConjugationType.DETERMINER_FUTURE
  | `${ConjugationType.DECLARATIVE_PRESENT} ${FormalityMinusNone}`
  | `${ConjugationType.DECLARATIVE_PAST} ${FormalityMinusNone}`
  | `${ConjugationType.DECLARATIVE_FUTURE} ${FormalityMinusNone}`
  | `${ConjugationType.IMPERATIVE} ${FormalityMinusNone}`
  | `${ConjugationType.INTERROGATIVE_PRESENT} ${FormalityMinusNone}`
  | `${ConjugationType.INTERROGATIVE_PAST} ${FormalityMinusNone}`
  | `${ConjugationType.PROPOSITIVE} ${FormalityMinusNone}`
  | `${ConjugationType.SUPPOSITIVE} ${FormalityMinusNone}`;
