import React from "react";
import { render } from "@testing-library/react-native";
import ConjInfoCard from "../ConjInfoCard";

describe("ConjInfoCard component", () => {
  const conjugation = {
    name: "name",
    conjugation: "conj",
    type: "declarative present",
    tense: "PRESENT" as "PRESENT",
    speechLevel: "INFORMAL_LOW" as "INFORMAL_LOW",
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
