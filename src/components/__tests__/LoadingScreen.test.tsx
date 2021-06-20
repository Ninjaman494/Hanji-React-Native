import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import LoadingScreen from "components/LoadingScreen";

describe("LoadingScreen component", () => {
  const props = {
    text: "Title",
  };

  it("has a title", () => {
    const component = render(<LoadingScreen {...props} />);

    expect(component.getByText(props.text)).toBeTruthy();
  });
});
