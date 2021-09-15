import { Favorite } from "hooks/useGetFavorites";
import React from "react";
import "react-native";
import { ConjugationName, Formality, Tense } from "utils/conjugationTypes";
import { render } from "utils/testUtils";
import FavoritesCard from "../../components/FavoritesCard";

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
};

describe("FavoritesCard component", () => {
  it("displays favorites", () => {
    const component = render(<FavoritesCard {...props} />);
    expect(component).toMatchSnapshot();
  });
});
