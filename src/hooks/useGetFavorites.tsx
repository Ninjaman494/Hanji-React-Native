import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConjugationName } from "utils/conjugationTypes";

export type Favorite = {
  name: string;
  conjugationName: ConjugationName;
  honorific: boolean;
};

export interface GetFavoritesResponse {
  favorites: Favorite[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const FAVORITES_KEY = "@favorites_Key";

const useGetFavorites = (): GetFavoritesResponse => {
  const [favorites, setFavorites] = useState<Favorite[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFavorites = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(FAVORITES_KEY);
      if (value !== null) {
        setFavorites(JSON.parse(value));
      } else {
        setFavorites(null);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [setFavorites, setLoading, setError]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, loading, error, refetch: fetchFavorites };
};

export default useGetFavorites;
