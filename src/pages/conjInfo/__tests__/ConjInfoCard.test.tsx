import React from "react";
import {
  ConjugationName,
  ConjugationType,
  Formality,
  Tense,
} from "utils/conjugationTypes";
import { render } from "utils/testUtils";
import ConjInfoCard from "../ConjInfoCard";

describe("ConjInfoCard component", () => {
  const conjugation = {
    name: "name" as ConjugationName,
    conjugation: "conj",
    type: ConjugationType.DECLARATIVE_PRESENT,
    tense: Tense.PRESENT,
    speechLevel: Formality.INFORMAL_LOW,
    honorific: false,
    pronunciation: "pronunciation",
    romanization: "romanization",
    reasons: ["reason 1 (details)", "reason 2 (details)", "reason 3 (details)"],
  };

  it("displays a regular conjugation", () => {
    const component = render(<ConjInfoCard conjugation={conjugation} />);

    expect(component).toMatchSnapshot();
  });

  it("displays an honorific conjugation", () => {
    const component = render(
      <ConjInfoCard conjugation={{ ...conjugation, honorific: true }} />
    );

    expect(component).toMatchSnapshot();
  });
});
