import React from "react";
import "react-native";
import { ConjugationName, Formality, Tense } from "utils/conjugationTypes";
import { render } from "utils/testUtils";
import ConjugationCard from "../ConjugationCard";

describe("ConjugationCard", () => {
  const baseConjugation = {
    type: "type",
    tense: Tense.PRESENT,
    speechLevel: Formality.INFORMAL_LOW,
    honorific: false,
    pronunciation: "pronunciation",
    romanization: "romanization",
    reasons: [],
  };

  const props = {
    conjugations: [
      {
        name: "name 1" as ConjugationName,
        conjugation: "conj 1",
        ...baseConjugation,
      },
      {
        name: "name 2" as ConjugationName,
        conjugation: "conj 2",
        ...baseConjugation,
      },
      {
        name: "name 3" as ConjugationName,
        conjugation: "conj 3",
        ...baseConjugation,
      },
    ],
  };

  it("displays conjugations", () => {
    const component = render(<ConjugationCard {...props} />);
    expect(component).toMatchSnapshot();
  });
});
