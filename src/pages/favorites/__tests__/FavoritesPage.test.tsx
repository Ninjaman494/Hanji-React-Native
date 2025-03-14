jest.mock("hooks/useGetFavorites");
jest.mock("hooks/useSetFavorites");

import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import React from "react";
import "react-native";
import { fireEvent, render, waitFor } from "utils/testUtils";
import FavoritesPage from "../FavoritesPage";

jest.useFakeTimers();

const favorites = [
  {
    name: "favorite 1",
    conjugationName: "declarative past informal high",
    honorific: false,
  },
  {
    name: "favorite 2",
    conjugationName: "declarative present informal high",
    honorific: false,
  },
  {
    name: "favorite 3",
    conjugationName: "declarative future informal high",
    honorific: true,
  },
];
(useGetFavorites as jest.Mock).mockReturnValue({
  loading: false,
  favorites,
  refetch: jest.fn(),
});

const setFavorites = jest.fn();
(useSetFavorites as jest.Mock).mockReturnValue({ setFavorites });

describe("FavoritesPage", () => {
  it("displays favorites", async () => {
    const result = render(<FavoritesPage />);

    favorites.forEach((fav) => {
      expect(result.getByText(fav.name)).toBeTruthy();
      expect(result.getByText(fav.conjugationName)).toBeTruthy();
    });
  });

  it("can delete a favorite", async () => {
    const result = render(<FavoritesPage />);

    fireEvent.press(result.getAllByLabelText("delete button")[0]);

    await waitFor(() =>
      expect(result.getByText("Delete Favorite?")).toBeTruthy()
    );
    fireEvent.press(result.getByText("Confirm"));

    expect(setFavorites).toHaveBeenCalledWith(favorites.slice(1));
  });

  it("opens add favorite modal", async () => {
    const result = render(<FavoritesPage />);

    expect(result.queryByText("Create Favorite")).toBeNull();

    fireEvent.press(result.getByLabelText("add favorite button"));

    await waitFor(() =>
      expect(result.getByText("Create Favorite")).toBeTruthy()
    );
  });
});
