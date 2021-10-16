jest.mock("@expo-google-fonts/laila");
jest.mock("react-router");
jest.mock("hooks/useGetWOD");

import { useFonts } from "@expo-google-fonts/laila";
import useGetFavorites from "hooks/useGetFavorites";
import useGetWOD from "hooks/useGetWOD";
import React from "react";
import "react-native";
import { useHistory } from "react-router";
import { fireEvent, render, waitFor } from "utils/testUtils";
import MainPage from "../MainPage";

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
