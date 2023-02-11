import { useCallback, useEffect, useState } from "react";
import { FAVORITES_KEY, getAsyncStorage } from "utils/asyncStorageHelper";
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
      const value = await getAsyncStorage(FAVORITES_KEY, "object");
      setFavorites(value as Favorite[] | null);
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
