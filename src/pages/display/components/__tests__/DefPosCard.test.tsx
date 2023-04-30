import React from "react";
import "react-native";
import { render } from "utils/testUtils";
import DefPosCard from "../../components/DefPosCard";

describe("DefPosCard component", () => {
  const props = {
    entry: {
      id: "id",
      term: "term",
      pos: "pos",
      definitions: ["def 1", "def 2", "def 3"],
      alwaysHonorific: false,
    },
  };

  it("displays content", () => {
    const component = render(<DefPosCard {...props} />);
    const entry = props.entry;

    expect(component.getByText(entry.term)).toBeTruthy();
    expect(component.getByText(entry.pos)).toBeTruthy();
    entry.definitions.forEach((def) =>
      expect(component.getByText(def)).toBeTruthy()
    );
  });
});
