jest.mock("hooks/useGetFavorites");
jest.mock("hooks/useSetFavorites");

import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import React from "react";
import "react-native";
import { fireEvent, render, waitFor } from "utils/testUtils";
import FavoritesPage from "../FavoritesPage";

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

    fireEvent(result.getByText("favorite 1"), "onLongPress");

    await waitFor(() => expect(result.getByText("Delete")).toBeTruthy());
    fireEvent.press(result.getByText("Delete"));

    expect(setFavorites).toHaveBeenCalledWith(favorites.slice(1));
  });

  it("opens add favorite modal", async () => {
    const result = render(<FavoritesPage />);

    fireEvent.press(result.getByLabelText("add favorite button"));
    await waitFor(() =>
      expect(result.getByText("Create Favorite")).toBeTruthy()
    );

    fireEvent.press(result.getByText("Cancel"));
    await waitFor(() =>
      expect(
        result.getByText("Create Favorite").parent?.props.visible
      ).toBeFalsy()
    );
  });
});
