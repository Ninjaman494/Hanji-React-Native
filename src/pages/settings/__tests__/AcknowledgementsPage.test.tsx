jest.mock("react-router");
jest.mock("react-native/Libraries/Linking/Linking");

import React from "react";
import { Linking } from "react-native";
import { fireEvent, render, waitFor } from "utils/testUtils";
import AcknowledgementsPage from "../AcknowledgementsPage";

describe("AcknowledgementsPage", () => {
  it("lists acknowledgements", () => {
    const result = render(<AcknowledgementsPage />);

    expect(result.getByText("@apollo/client")).toBeTruthy();
    expect(result.getByText("Version: 3.2.3")).toBeTruthy();

    expect(result.getByText("expo-status-bar")).toBeTruthy();
    expect(result.getByText("Version: 1.0.4")).toBeTruthy();

    expect(result.getByText("formik")).toBeTruthy();
    expect(result.getByText("Version: 2.2.9")).toBeTruthy();
  });

  it("redirects to repository", async () => {
    const result = render(<AcknowledgementsPage />);
    const openURL = jest.spyOn(Linking, "openURL");

    fireEvent.press(result.getByText("@apollo/client"));
    await waitFor(() => {
      expect(openURL).toHaveBeenCalledWith(
        "https://github.com/apollographql/apollo-client"
      );
    });

    fireEvent.press(result.getByText("expo-status-bar"));
    await waitFor(() => {
      expect(openURL).toHaveBeenCalledWith("https://github.com/expo/expo");
    });

    fireEvent.press(result.getByText("graphql"));
    await waitFor(() => {
      expect(openURL).toHaveBeenCalledWith(
        "https://github.com/graphql/graphql-js"
      );
    });
  });
});
