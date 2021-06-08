import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import ConjugationsPageContent from "../ConjugationPageContent";
import { Conjugation } from "hooks/useConjugations";

describe("ConjugationPageContent component", () => {
  const typeOneBase = {
    name: "name 1",
    conjugation: "conj 1",
    type: "declarative present",
    tense: "PRESENT" as "PRESENT",
    speechLevel: "INFORMAL_LOW" as "INFORMAL_LOW",
    honorific: false,
    pronunciation: "pronunciation",
    romanization: "romanization",
    reasons: [],
  };

  const typeOneConjugations: Conjugation[] = [
    typeOneBase,
    { ...typeOneBase, speechLevel: "INFORMAL_HIGH", conjugation: "conj 2" },
    { ...typeOneBase, speechLevel: "FORMAL_LOW", conjugation: "conj 3" },
  ];

  const typeTwoBase = {
    name: "name 1",
    conjugation: "conj 3",
    type: "declarative future",
    tense: "PRESENT" as "PRESENT",
    speechLevel: "INFORMAL_LOW" as "INFORMAL_LOW",
    honorific: false,
    pronunciation: "pronunciation",
    romanization: "romanization",
    reasons: [],
  };

  const typeTwoConjugations: Conjugation[] = [
    typeTwoBase,
    { ...typeTwoBase, speechLevel: "INFORMAL_HIGH", conjugation: "conj 4" },
    { ...typeTwoBase, speechLevel: "FORMAL_LOW", conjugation: "conj 5" },
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
