jest.mock("hooks/useGetFavorites");
jest.mock("react-router");
jest.mock("react-native/Libraries/Linking/Linking");
jest.mock("react-native-rate");

import { Linking } from "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import Rate from "react-native-rate";
import SettingsPage from "../SettingsPage";
import { useHistory } from "react-router";
import useGetFavorites from "hooks/useGetFavorites";
import { ConjugationType, Formality } from "utils/conjugationTypes";
import { ratingOptions } from "components/RatingHandler";

const pushHistory = jest.fn();
(useHistory as jest.Mock).mockReturnValue({
  push: pushHistory,
});

(useGetFavorites as jest.Mock).mockReturnValue({
  favorites: [
    {
      name: "Past",
      conjugationName: `${ConjugationType.DECLARATIVE_PAST} ${Formality.INFORMAL_HIGH}`,
      honorific: false,
    },
    {
      name: "Present",
      conjugationName: `${ConjugationType.DECLARATIVE_PRESENT} ${Formality.INFORMAL_HIGH}`,
      honorific: false,
    },
  ],
  loading: false,
});

describe("SettingsPage", () => {
  it("goes to the favorites page", async () => {
    const result = render(<SettingsPage />);

    expect(result.queryByText("you have 2 favorites")).toBeDefined();

    fireEvent.press(result.getByText("Favorites"));

    await waitFor(() => {
      expect(pushHistory).toHaveBeenCalledWith("/favorites");
    });
  });

  it("goes to the Privacy Polcy webpage", async () => {
    const result = render(<SettingsPage />);

    const openURL = jest.spyOn(Linking, "openURL");

    fireEvent.press(result.getByText("Privacy Policy"));

    await waitFor(() => {
      expect(openURL).toHaveBeenCalledWith("https://hanji.vercel.app/privacy");
    });
  });

  it("goes to the TCU webpage", async () => {
    const result = render(<SettingsPage />);

    const openURL = jest.spyOn(Linking, "openURL");

    fireEvent.press(result.getByText("Terms & Conditions of Use"));

    await waitFor(() => {
      expect(openURL).toHaveBeenCalledWith("https://hanji.vercel.app/terms");
    });
  });

  describe("About section", () => {
    it("displays the app version", () => {
      const result = render(<SettingsPage />);

      expect(result.getByText("Version")).toBeTruthy();
      expect(result.getByText("0.0.1")).toBeTruthy();
    });

    it("redirects to Acknowledgements", async () => {
      const result = render(<SettingsPage />);

      fireEvent.press(result.getByText("Acknowledgements"));

      await waitFor(() => {
        expect(pushHistory).toHaveBeenCalledWith("/acknowledgements");
      });
    });

    it("lets user leave a review", async () => {
      const result = render(<SettingsPage />);

      fireEvent.press(result.getByText("Leave a Review"));

      await waitFor(() => {
        expect(Rate.rate).toHaveBeenCalledWith(
          { ...ratingOptions, preferInApp: false },
          expect.any(Function)
        );
      });
    });
  });
});
