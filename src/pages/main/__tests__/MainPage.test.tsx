jest.mock("@expo-google-fonts/laila");
jest.mock("hooks/useGetWOD");

import { useFonts } from "@expo-google-fonts/laila";
import useGetWOD from "hooks/useGetWOD";
import React from "react";
import "react-native";
import { fireEvent, render, waitFor } from "utils/testUtils";
import MainPage from "../MainPage";

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

const navigation = { push: jest.fn() };

describe("MainPage", () => {
  it("can perform a search", async () => {
    const result = render(<MainPage {...({ navigation } as any)} />);

    fireEvent.changeText(
      result.getByPlaceholderText("Search in Korean or English..."),
      "foobar"
    );
    fireEvent.press(result.getByLabelText("search button"));

    await waitFor(() =>
      expect(navigation.push).toHaveBeenCalledWith("Search", {
        query: "foobar",
      })
    );
  });
});
