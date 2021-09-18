import React from "react";
import "react-native";
import { render } from "utils/testUtils";
import ExamplesCard from "../../components/ExamplesCard";

describe("ExamplesCard component", () => {
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
    const component = render(<ExamplesCard {...props} />);

    props.examples.forEach(({ sentence, translation }) => {
      expect(component.getByText(sentence)).toBeTruthy();
      expect(component.getByText(translation)).toBeTruthy();
    });
  });
});
