import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import DefPosCard from "../DefPosCard";

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
    let component = render(<DefPosCard {...props} />);
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
