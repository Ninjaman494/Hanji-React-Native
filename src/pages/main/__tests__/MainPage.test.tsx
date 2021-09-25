jest.mock("@expo-google-fonts/laila");
jest.mock("react-router");
jest.mock("hooks/useGetFavorites");
jest.mock("hooks/useGetWOD");
jest.mock("hooks/useSetFavorites");

import { useFonts } from "@expo-google-fonts/laila";
import useGetFavorites from "hooks/useGetFavorites";
import useGetWOD from "hooks/useGetWOD";
import useSetFavorites from "hooks/useSetFavorites";
import React from "react";
import "react-native";
import { useHistory } from "react-router";
import { fireEvent, render, waitFor } from "utils/testUtils";
import MainPage, { DEFAULT_FAVORITES } from "../MainPage";

const setFavorites = jest.fn();
(useSetFavorites as jest.Mock).mockReturnValue({ setFavorites });

const pushHistory = jest.fn();
(useHistory as jest.Mock).mockReturnValue({
  push: pushHistory,
});

(useFonts as jest.Mock).mockReturnValue([true]);

(useGetWOD as jest.Mock).mockReturnValue({
  loading: false,
  error: null,
  data: {
    wordOfTheDay: {
      id: "abc1",
      term: "foo",
    },
  },
});

describe("MainPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetFavorites as jest.Mock).mockReturnValue({
      loading: false,
      favorites: [],
    });
  });

  it("creates favorites if none exist", async () => {
    (useGetFavorites as jest.Mock).mockReturnValue({
      loading: false,
      favorites: null,
    });

    render(<MainPage />);

    await waitFor(() =>
      expect(setFavorites).toHaveBeenCalledWith(DEFAULT_FAVORITES)
    );
  });

  it("doesn't create favorites if they already exist", async () => {
    render(<MainPage />);

    await waitFor(() => {
      expect(useGetFavorites).toHaveBeenCalled();
      expect(setFavorites).not.toHaveBeenCalled();
    });
  });

  it("can perform a search", async () => {
    const result = render(<MainPage />);

    fireEvent.changeText(
      result.getByPlaceholderText("Search in Korean or English..."),
      "foobar"
    );
    fireEvent.press(result.getByLabelText("search button"));

    await waitFor(() =>
      expect(pushHistory).toHaveBeenCalledWith("/search?query=foobar")
    );
  });
});
