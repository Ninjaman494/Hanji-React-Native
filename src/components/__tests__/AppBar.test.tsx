jest.mock("react-router");

import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import AppBar from "../AppBar";
import { useHistory } from "react-router";

const pushHistory = jest.fn();
(useHistory as jest.Mock).mockReturnValue({
  push: pushHistory,
});

describe("AppBar component", () => {
  const props = {
    title: "Title",
  };

  it("has a title", () => {
    const component = render(<AppBar {...props} />);

    expect(component.getByText(props.title)).toBeTruthy();
  });

  it("shows search bar when clicked", () => {
    const component = render(<AppBar {...props} />);

    expect(component.queryByTestId("appBarSearch")).toBeNull();

    fireEvent(component.getByTestId("appBarSearchBtn"), "onPress");

    expect(component.queryByTestId("appBarSearch")).not.toBeNull();
    expect(component.getByTestId("appBarSearch").props.placeholder).toBe(
      "Search in Korean or English..."
    );

    fireEvent(component.getByTestId("appBarSearch"), "onChangeText", "query");

    expect(component.getByTestId("appBarSearch").props.value).toBe("query");
  });

  it("redirects to the search page", () => {
    const component = render(<AppBar {...props} />);

    fireEvent.press(component.getByTestId("appBarSearchBtn"));
    fireEvent.changeText(component.getByTestId("appBarSearch"), "query");
    fireEvent(component.getByTestId("appBarSearch"), "onSubmitEditing");

    expect(pushHistory).toHaveBeenCalledWith("/search?query=query");
  });
});
