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
    },
  };

  it("displays content", () => {
    const component = render(<DefPosCard {...props} />);
    const entry = props.entry;

    expect(component.getByTestId("defPosCardTerm")).toContainText(entry.term);
    expect(component.getByTestId("defPosCardPos")).toContainText(entry.pos);

    component
      .getAllByTestId("defPosCardDef")
      .forEach((item, index) =>
        expect(item).toContainText(entry.definitions[index])
      );
  });
});
