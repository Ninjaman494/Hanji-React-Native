jest.mock("hooks/useGetFavorites");
jest.mock("react-native/Libraries/Linking/Linking");
jest.mock("expo-store-review");

import * as StoreReview from "expo-store-review";
import useGetFavorites from "hooks/useGetFavorites";
import React from "react";
import { Linking } from "react-native";
import { ConjugationType, Formality } from "utils/conjugationTypes";
import { fireEvent, render, waitFor } from "utils/testUtils";
import SettingsPage from "../SettingsPage";

jest.spyOn(StoreReview, "storeUrl").mockReturnValue("store-url");

const version = "1.0.0";
jest.mock("expo-constants", () => ({
  ...jest.requireActual("expo-constants"),
  nativeAppVersion: version,
}));

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

const props = {
  navigation: {
    push: jest.fn(),
    addListener: jest.fn(),
    goBack: jest.fn(),
  },
};

describe("SettingsPage", () => {
  it("goes to the favorites page", async () => {
    const result = render(<SettingsPage {...(props as any)} />);

    expect(result.queryByText("you have 2 favorites")).toBeDefined();

    fireEvent.press(result.getByText("Favorites"));

    await waitFor(() => {
      expect(props.navigation.push).toHaveBeenCalledWith("Favorites");
    });
  });

  it("goes to the Privacy Polcy webpage", async () => {
    const openURL = jest.spyOn(Linking, "openURL");
    const result = render(<SettingsPage {...(props as any)} />);

    fireEvent.press(result.getByText("Privacy Policy"));

    await waitFor(() => {
      expect(openURL).toHaveBeenCalledWith("https://hanji.vercel.app/privacy");
    });
  });

  it("goes to the TCU webpage", async () => {
    const openURL = jest.spyOn(Linking, "openURL");
    const result = render(<SettingsPage {...(props as any)} />);

    fireEvent.press(result.getByText("Terms & Conditions of Use"));

    await waitFor(() => {
      expect(openURL).toHaveBeenCalledWith("https://hanji.vercel.app/terms");
    });
  });

  describe("About section", () => {
    it("displays the app version", () => {
      const result = render(<SettingsPage {...(props as any)} />);

      expect(result.getByText("Version")).toBeTruthy();
      expect(result.getByText(version)).toBeTruthy();
    });

    it("redirects to Acknowledgements", async () => {
      const result = render(<SettingsPage {...(props as any)} />);

      fireEvent.press(result.getByText("Acknowledgements"));

      await waitFor(() => {
        expect(props.navigation.push).toHaveBeenCalledWith("Acknowledgements");
      });
    });

    it("lets user leave a review", async () => {
      const openURL = jest.spyOn(Linking, "openURL");
      const result = render(<SettingsPage {...(props as any)} />);

      fireEvent.press(result.getByText("Leave a Review"));

      await waitFor(() => {
        expect(openURL).toHaveBeenCalledWith(StoreReview.storeUrl());
      });
    });
  });
});
