jest.mock("@apollo/client");

import { useQuery } from "@apollo/client";
import { renderHook } from "@testing-library/react-hooks";
import useGetFavoritesConjugations from "hooks/useGetFavoritesConjugations";
import { ConjugationName, Tense } from "utils/conjugationTypes";
import { waitFor } from "utils/testUtils";

const vars = {
  stem: "foobar",
  isAdj: false,
  favorites: [
    {
      name: "fav 1",
      conjugationName: "declarative past informal low" as ConjugationName,
      honorific: false,
    },
    {
      name: "fav 2",
      conjugationName: "determiner past" as ConjugationName,
      honorific: false,
    },
  ],
};

const baseConjugation = {
  type: "type",
  tense: Tense.PRESENT,
  honorific: false,
  pronunciation: "pronunciation",
  romanization: "romanization",
  reasons: [],
};

const conjugations = [
  {
    name: vars.favorites[0].conjugationName,
    conjugation: "conj 1",
    speechLevel: "INFORMAL_LOW",
    ...baseConjugation,
  },
  {
    name: vars.favorites[1].conjugationName,
    conjugation: "conj 2",
    speechLevel: "INFORMAL_HIGH",
    ...baseConjugation,
  },
];

describe("useGetFavoritesConjugations hook", () => {
  it("gets favorites conjugations", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { favorites: conjugations },
      loading: false,
      error: undefined,
    });

    const { result } = renderHook(() =>
      useGetFavoritesConjugations({ ...vars })
    );

    await waitFor(() => {
      const { data, loading, error } = result.current;
      expect(data?.favorites).toEqual([
        { ...conjugations[0], speechLevel: "informal low" },
        { ...conjugations[1], speechLevel: "informal high" },
      ]);
      expect(loading).toBeFalsy();
      expect(error).toBeUndefined();
    });
  });

  it("filters out null conjugations", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { favorites: [conjugations[0], null] },
      loading: false,
      error: undefined,
    });

    const { result } = renderHook(() =>
      useGetFavoritesConjugations({ ...vars })
    );

    await waitFor(() => {
      const { data, loading, error } = result.current;
      expect(data?.favorites).toEqual([
        { ...conjugations[0], speechLevel: "informal low" },
      ]);
      expect(loading).toBeFalsy();
      expect(error).toBeUndefined();
    });
  });
});
