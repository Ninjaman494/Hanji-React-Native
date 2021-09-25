import LoadingScreen from "components/LoadingScreen";
import React from "react";
import "react-native";
import { render } from "utils/testUtils";

describe("LoadingScreen component", () => {
  const props = {
    text: "Title",
  };

  it("has a title", () => {
    const component = render(<LoadingScreen {...props} />);

    expect(component.getByText(props.text)).toBeTruthy();
  });
});
