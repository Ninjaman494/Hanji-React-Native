jest.mock("hooks/useGetFavorites");
jest.mock("react-router");
jest.mock("react-native/Libraries/Linking/Linking");

import { Linking } from "react-native";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import SettingsPage from "../SettingsPage";
import { useHistory } from "react-router";
import useGetFavorites from "hooks/useGetFavorites";
import { ConjugationType, Formality } from "utils/conjugationTypes";

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
});
