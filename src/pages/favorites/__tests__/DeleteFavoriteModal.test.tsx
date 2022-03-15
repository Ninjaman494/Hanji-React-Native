jest.mock("hooks/useSetFavorites");
jest.mock("hooks/useGetFavorites");

import { Favorite } from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import React from "react";
import "react-native";
import { ConjugationType, Formality } from "utils/conjugationTypes";
import { fireEvent, render, waitFor } from "utils/testUtils";
import DeleteFavoriteModal from "../DeleteFavoriteModal";

const setFavorites = jest.fn();
(useSetFavorites as jest.Mock).mockReturnValue({ setFavorites });

const favorites = [
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
  {
    name: "Future",
    conjugationName: `${ConjugationType.DECLARATIVE_FUTURE} ${Formality.INFORMAL_HIGH}`,
    honorific: false,
  },
] as Favorite[];

const props = {
  visible: true,
  favorites: favorites,
  favToDelete: favorites[0],
  onDismiss: jest.fn(),
  onSubmit: jest.fn(),
};

describe("DeleteFavoritesModal", () => {
  it("deletes favorite", async () => {
    const component = render(<DeleteFavoriteModal {...props} />);

    fireEvent.press(component.getByText("Confirm"));

    await waitFor(() => {
      expect(setFavorites).toHaveBeenCalledWith(favorites.slice(1));
      expect(props.onSubmit).toHaveBeenCalled();
      expect(props.onDismiss).not.toHaveBeenCalled();
    });
  });

  it("does not delete when canceled", async () => {
    const component = render(<DeleteFavoriteModal {...props} />);

    fireEvent.press(component.getByText("Cancel"));

    await waitFor(() => {
      expect(setFavorites).not.toHaveBeenCalled();
      expect(props.onSubmit).not.toHaveBeenCalled();
      expect(props.onDismiss).toHaveBeenCalled();
    });
  });
});
