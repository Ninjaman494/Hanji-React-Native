import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import ConjugationCard from "../ConjugationCard";

describe("BaseCard component", () => {
  const baseConjugation = {
    type: "type",
    tense: "PRESENT" as "PRESENT",
    speechLevel: "INFORMAL_LOW" as "INFORMAL_LOW",
    honorific: false,
    pronunciation: "pronunciation",
    romanization: "romanization",
    reasons: [],
  };

  const props = {
    conjugations: [
      {
        name: "name 1",
        conjugation: "conj 1",
        ...baseConjugation,
      },
      {
        name: "name 2",
        conjugation: "conj 2",
        ...baseConjugation,
      },
      {
        name: "name 2",
        conjugation: "conj 2",
        ...baseConjugation,
      },
    ],
  };

  it("displays conjugations", () => {
    const component = render(<ConjugationCard {...props} />);
    const conjugations = props.conjugations;

    component.getAllByTestId("conjCardRow").forEach((row, index) => {
      expect(row).toContainText("informal low");
      expect(row).toContainText(":");
      expect(row).toContainText(conjugations[index].conjugation);
    });
  });
});
