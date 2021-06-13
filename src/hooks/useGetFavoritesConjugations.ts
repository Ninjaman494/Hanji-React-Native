import { gql, QueryHookOptions, useQuery } from "@apollo/client";
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
) =>
  useQuery<FavoritesResponse>(FAVORITES, {
    variables,
    ...options,
  });

export default useGetFavoritesConjugations;
