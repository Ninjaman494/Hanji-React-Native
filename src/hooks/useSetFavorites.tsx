import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Favorite, FAVORITES_KEY } from "hooks/useGetFavorites";

export interface SetFavoritesResponse {
  setFavorites: (favorites: Favorite[]) => Promise<void>;
  loading: boolean;
  error?: Error;
}

const useSetFavorites = (): SetFavoritesResponse => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const setFavorites = useCallback(
    async (favorites: Favorite[]) => {
      setLoading(true);
      try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [FAVORITES_KEY, setLoading, setError]
  );

  return { setFavorites, loading, error };
};

export default useSetFavorites;
