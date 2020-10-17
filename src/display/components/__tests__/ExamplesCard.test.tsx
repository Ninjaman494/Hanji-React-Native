import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import ExamplesCard from "../ExamplesCard";

describe("DefPosCard component", () => {
  const props = {
    examples: [
      {
        sentence: "sentence 1",
        translation: "translation 1",
      },
      {
        sentence: "sentence 2",
        translation: "translation 2",
      },
      {
        sentence: "sentence 3",
        translation: "translation 3",
      },
    ],
  };

  it("displays examples", () => {
    let component = render(<ExamplesCard {...props} />);
    const examples = props.examples;

    component.getAllByTestId("examplesCardItem").forEach((item, index) => {
      expect(item).toContainText(examples[index].sentence);
      expect(item).toContainText(examples[index].translation);
    });
  });
});
