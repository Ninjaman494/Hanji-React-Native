import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { convertToObj, FAVORITES_KEY } from "utils/asyncStorageHelper";
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

const useGetFavorites = (): GetFavoritesResponse => {
  const [favorites, setFavorites] = useState<Favorite[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFavorites = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(FAVORITES_KEY);
      setFavorites(convertToObj(value));
    } catch (e) {
      setError(e as Error);
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
