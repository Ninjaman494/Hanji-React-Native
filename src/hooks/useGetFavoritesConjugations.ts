import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Formality } from "utils/conjugationTypes";
import { Conjugation } from "./useConjugations";
import { Favorite } from "./useGetFavorites";

const FAVORITES = gql`
  query FavoritesConjugationsQuery(
    $stem: String!
    $isAdj: Boolean!
    $favorites: [FavInput]!
  ) {
    favorites(stem: $stem, isAdj: $isAdj, favorites: $favorites) {
      name
      conjugation
      type
      tense
      speechLevel
      honorific
      pronunciation
      romanization
      reasons
    }
  }
`;

interface FavoritesResponse {
  favorites: Conjugation[];
}

interface FavoritesConjugationsVars {
  stem: string;
  isAdj: boolean;
  favorites: Favorite[];
}

const useGetFavoritesConjugations = (
  variables: FavoritesConjugationsVars,
  options?: QueryHookOptions
) => {
  const { data, ...rest } = useQuery<FavoritesResponse>(FAVORITES, {
    ...options,
    variables,
  });

  const [favorites, setFavorites] = useState<Conjugation[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (data) {
      setFavorites(
        data.favorites.map((c) => ({
          ...c,
          speechLevel: c.speechLevel
            .toLowerCase()
            .split("_")
            .join(" ") as Formality,
        }))
      );
    }
  }, [data, setFavorites]);

  return { data: { favorites }, ...rest };
};

export default useGetFavoritesConjugations;
