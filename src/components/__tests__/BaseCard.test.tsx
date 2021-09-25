import BaseCard from "components/BaseCard";
import React from "react";
import "react-native";
import { render } from "utils/testUtils";

describe("BaseCard component", () => {
  const props = {
    title: "Title",
  };

  it("has a title", () => {
    const component = render(<BaseCard {...props} />);

    expect(component.getByText(props.title)).toBeTruthy();
  });
});
