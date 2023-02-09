import AsyncStorage from "@react-native-async-storage/async-storage";
import { Favorite } from "hooks/useGetFavorites";
import { useCallback, useState } from "react";
import { FAVORITES_KEY } from "utils/asyncStorageKeys";

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
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    },
    [FAVORITES_KEY, setLoading, setError]
  );

  return { setFavorites, loading, error };
};

export default useSetFavorites;
