jest.mock("components/ViewShotProvider");

import { useNavigation } from "@react-navigation/native";
import AppBar from "components/AppBar";
import { useViewShot } from "components/ViewShotProvider";
import React from "react";
import "react-native";
import { NavigationProps } from "typings/navigation";
import { fireEvent, render, waitFor } from "utils/testUtils";

const { push, goBack } = useNavigation<NavigationProps>();

const screenshotUri = "uri";
(useViewShot as jest.Mock).mockReturnValue(() =>
  Promise.resolve(screenshotUri)
);

describe("AppBar component", () => {
  const props = { title: "Title" };

  it("has a title", () => {
    const component = render(<AppBar {...props} />);
    expect(component.getByText(props.title)).toBeTruthy();
  });
  it("can hide search button", () => {
    const component = render(<AppBar {...props} hideSearch />);
    expect(component.queryByLabelText("search button")).toBeNull();
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

  it("redirects to the search page", () => {
    const component = render(<AppBar {...props} />);

    fireEvent.press(component.getByLabelText("search button"));
    fireEvent.changeText(component.getByLabelText("search input"), "query");
    fireEvent(component.getByLabelText("search input"), "onSubmitEditing");

    expect(push).toHaveBeenCalledWith("Search", { query: "query" });
  });

  it("can click add button", () => {
    const onAdd = jest.fn();
    const component = render(<AppBar {...props} onAdd={onAdd} />);

    fireEvent.press(component.getByLabelText("add button"));

    expect(onAdd).toHaveBeenCalled();
  });

  describe("overflow menu", () => {
    it("redirects to settings page", async () => {
      const component = render(<AppBar {...props} />);

      fireEvent.press(component.getByLabelText("overflow menu button"));

      await waitFor(() => expect(component.getByText("Settings")).toBeTruthy());
      fireEvent.press(component.getByText("Settings"));

      expect(push).toHaveBeenCalledWith("Settings");
    });

    it("redirects to bug report page", async () => {
      const component = render(<AppBar {...props} />);

      fireEvent.press(component.getByLabelText("overflow menu button"));

      await waitFor(() =>
        expect(component.getByText("Report a Bug")).toBeTruthy()
      );
      fireEvent.press(component.getByText("Report a Bug"));

      await waitFor(() =>
        expect(push).toHaveBeenCalledWith("BugReport", {
          screenshot: screenshotUri,
        })
      );
    });
  });
});
