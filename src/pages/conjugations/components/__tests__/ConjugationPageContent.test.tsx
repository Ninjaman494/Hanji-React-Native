import { Conjugation } from "hooks/useConjugations";
import React from "react";
import "react-native";
import { ConjugationName, Formality, Tense } from "utils/conjugationTypes";
import { render } from "utils/testUtils";
import ConjugationsPageContent from "../ConjugationPageContent";

describe("ConjugationPageContent component", () => {
  const typeOneBase = {
    name: "name 1" as ConjugationName,
    conjugation: "conj 1",
    type: "declarative present",
    tense: Tense.PRESENT,
    speechLevel: Formality.INFORMAL_LOW,
    honorific: false,
    pronunciation: "pronunciation",
    romanization: "romanization",
    reasons: [],
  };

  const typeOneConjugations: Conjugation[] = [
    typeOneBase,
    {
      ...typeOneBase,
      speechLevel: Formality.INFORMAL_HIGH,
      conjugation: "conj 2",
    },
    {
      ...typeOneBase,
      speechLevel: Formality.FORMAL_LOW,
      conjugation: "conj 3",
    },
  ];

  const typeTwoBase = {
    name: "name 1" as ConjugationName,
    conjugation: "conj 3",
    type: "declarative future",
    tense: Tense.PRESENT,
    speechLevel: Formality.INFORMAL_LOW,
    honorific: false,
    pronunciation: "pronunciation",
    romanization: "romanization",
    reasons: [],
  };

  const typeTwoConjugations: Conjugation[] = [
    typeTwoBase,
    {
      ...typeTwoBase,
      speechLevel: Formality.INFORMAL_HIGH,
      conjugation: "conj 4",
    },
    {
      ...typeTwoBase,
      speechLevel: Formality.FORMAL_LOW,
      conjugation: "conj 5",
    },
  ];

  const props = {
    conjugations: typeOneConjugations.concat(typeTwoConjugations),
    onScroll: jest.fn(),
  };

  it("groups conjugations based on type", () => {
    const component = render(<ConjugationsPageContent {...props} />);

    expect(component).toMatchSnapshot();
  });
});
