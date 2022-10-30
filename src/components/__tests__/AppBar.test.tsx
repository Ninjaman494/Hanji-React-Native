jest.mock("providers/ViewShotProvider");
jest.mock("hooks/useGetAdFreeStatus");
jest.mock("utils/buyAdFree");

import { useNavigation } from "@react-navigation/native";
import AppBar from "components/AppBar";
import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import { useViewShot } from "providers/ViewShotProvider";
import React from "react";
import "react-native";
import { NavigationProps } from "typings/navigation";
import buyAdFree from "utils/buyAdFree";
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

    it("can handle ad free upgrades", async () => {
      (useGetAdFreeStatus as jest.Mock).mockReturnValue({ isAdFree: false });

      const component = render(<AppBar {...props} />);

      fireEvent.press(component.getByLabelText("overflow menu button"));

      await waitFor(() =>
        expect(component.getByText("Remove Ads")).toBeTruthy()
      );
      fireEvent.press(component.getByText("Remove Ads"));

      await waitFor(() => expect(buyAdFree).toHaveBeenCalled());
    });

    it("hides upgrade if already upgraded", async () => {
      const component = render(<AppBar {...props} />);

      fireEvent.press(component.getByLabelText("overflow menu button"));

      await waitFor(() => {
        // Checks that menu is open
        expect(component.getByText("Report a Bug")).toBeTruthy();
        expect(component.queryByLabelText("Remove Ads")).toBeNull();
      });
    });
  });
});
