import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";
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
  favorites: (Conjugation | null)[];
}

interface FavoritesConjugationsVars {
  stem: string;
  isAdj: boolean;
  favorites: Favorite[];
}

const useGetFavoritesConjugations = (
  variables: FavoritesConjugationsVars,
  options?: QueryHookOptions
): QueryResult<FavoritesResponse> => {
  const { data, ...rest } = useQuery<FavoritesResponse>(FAVORITES, {
    ...options,
    variables,
  });

  const [favorites, setFavorites] = useState<Conjugation[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    const conjugations = data.favorites?.reduce<Conjugation[]>(
      (prev, curr) =>
        curr
          ? prev.concat({
              ...curr,
              speechLevel: curr.speechLevel
                .replace(/_/g, " ")
                .toLowerCase() as Formality,
            })
          : prev,
      []
    );
    setFavorites(conjugations);
  }, [data, setFavorites]);

  return { data: favorites && { favorites }, ...rest };
};

export default useGetFavoritesConjugations;
