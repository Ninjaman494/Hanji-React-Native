jest.mock("react-router");

import { Favorite } from "hooks/useGetFavorites";
import React from "react";
import "react-native";
import { useHistory } from "react-router";
import { ConjugationName, Formality, Tense } from "utils/conjugationTypes";
import { fireEvent, render, waitFor } from "utils/testUtils";
import FavoritesCard from "../../components/FavoritesCard";

const pushHistory = jest.fn();
(useHistory as jest.Mock).mockReturnValue({
  push: pushHistory,
});

const favorites: Favorite[] = [
  {
    name: "Favorite 1",
    conjugationName: "declarative past informal high",
    honorific: false,
  },
  {
    name: "Favorite 2",
    conjugationName: "declarative present informal high",
    honorific: false,
  },
  {
    name: "Favorite 3",
    conjugationName: "declarative future informal high",
    honorific: false,
  },
];

const baseConjugation = {
  type: "type",
  tense: Tense.PRESENT,
  speechLevel: Formality.INFORMAL_HIGH,
  honorific: false,
  pronunciation: "pronunciation",
  romanization: "romanization",
  reasons: [],
};

const props = {
  favorites: favorites,
  conjugations: [
    {
      name: "declarative past informal high" as ConjugationName,
      conjugation: "conj 1",
      ...baseConjugation,
    },
    {
      name: "declarative present informal high" as ConjugationName,
      conjugation: "conj 2",
      ...baseConjugation,
    },
    {
      name: "declarative future informal high" as ConjugationName,
      conjugation: "conj 3",
      ...baseConjugation,
    },
  ],
  onPress: jest.fn(),
};

describe("FavoritesCard component", () => {
  it("displays favorites", () => {
    const component = render(<FavoritesCard {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("displays empty state", () => {
    const component = render(<FavoritesCard {...props} favorites={[]} />);
    expect(
      component.getByText(
        "You don't have any favorites. Click on favorites in settings to make some."
      )
    ).toBeTruthy();
  });

  it("triggers onClick", async () => {
    const component = render(<FavoritesCard {...props} />);

    fireEvent.press(component.getByText("See all"));

    await waitFor(() => expect(props.onPress).toHaveBeenCalled());
  });

  it("redirects to ConjInfo page", async () => {
    const component = render(<FavoritesCard {...props} />);

    fireEvent.press(component.getByText("Favorite 1"));

    await waitFor(() =>
      expect(pushHistory).toHaveBeenCalledWith("/conjinfo", {
        conjugation: props.conjugations[0],
      })
    );
  });
});
