import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Favorite, FAVORITES_KEY } from "hooks/useGetFavorites";

const useSetFavorites = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setFavorites = async (favorites: Favorite[]) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { setFavorites, loading, error };
};

export default useSetFavorites;
