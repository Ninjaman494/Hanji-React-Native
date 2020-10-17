import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import LoadingScreen from "../LoadingScreen";

describe("LoadingScreen component", () => {
  const props = {
    text: "Title",
  };

  it("has a title", () => {
    let component = render(<LoadingScreen {...props} />);

    expect(component.getByText(props.text)).toBeTruthy();
  });
});
