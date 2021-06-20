import "react-native";
import React from "react";
import BaseCard from "components/BaseCard";
import { render } from "@testing-library/react-native";

describe("BaseCard component", () => {
  const props = {
    title: "Title",
  };

  it("has a title", () => {
    const component = render(<BaseCard {...props} />);

    expect(component.getByText(props.title)).toBeTruthy();
  });
});
