jest.mock("react-router");
jest.mock("components/ViewShotProvider");

import AppBar from "components/AppBar";
import { useViewShot } from "components/ViewShotProvider";
import React from "react";
import "react-native";
import { useHistory } from "react-router";
import { fireEvent, render, waitFor } from "utils/testUtils";

const pushHistory = jest.fn();
const goBack = jest.fn();
(useHistory as jest.Mock).mockReturnValue({
  push: pushHistory,
  goBack,
});

const screenshotUri = "uri";
(useViewShot as jest.Mock).mockReturnValue(() =>
  Promise.resolve(screenshotUri)
);

describe("AppBar component", () => {
  const props = {
    title: "Title",
  };

  it("has a title", () => {
    const component = render(<AppBar {...props} />);
    expect(component.getByText(props.title)).toBeTruthy();
  });
  it("can hide search button", () => {
    const component = render(<AppBar {...props} hideSearch />);
    expect(component.queryByTestId("appBarSearchBtn")).toBeNull();
  });

  it("can hide back button", () => {
    const component = render(<AppBar {...props} hideBack />);
    expect(component.queryByLabelText("back button")).toBeNull();
  });

  it("can go back", () => {
    const component = render(<AppBar {...props} />);
    fireEvent.press(component.getByLabelText("back button"));
    expect(goBack).toHaveBeenCalled();
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

  describe("overflow menu", () => {
    it("redirects to the search page", () => {
      const component = render(<AppBar {...props} />);

      fireEvent.press(component.getByTestId("appBarSearchBtn"));
      fireEvent.changeText(component.getByTestId("appBarSearch"), "query");
      fireEvent(component.getByTestId("appBarSearch"), "onSubmitEditing");

      expect(pushHistory).toHaveBeenCalledWith("/search?query=query");
    });

    it("redirects to settings page", async () => {
      const component = render(<AppBar {...props} />);

      fireEvent.press(component.getByLabelText("overflow menu button"));

      await waitFor(() => expect(component.getByText("Settings")).toBeTruthy());
      fireEvent.press(component.getByText("Settings"));

      expect(pushHistory).toHaveBeenCalledWith("/settings");
    });

    it("redirects to bug report page", async () => {
      const component = render(<AppBar {...props} />);

      fireEvent.press(component.getByLabelText("overflow menu button"));

      await waitFor(() =>
        expect(component.getByText("Report a Bug")).toBeTruthy()
      );
      fireEvent.press(component.getByText("Report a Bug"));

      await waitFor(() =>
        expect(pushHistory).toHaveBeenCalledWith("/bugReport", {
          screenshot: screenshotUri,
        })
      );
    });
  });
});
