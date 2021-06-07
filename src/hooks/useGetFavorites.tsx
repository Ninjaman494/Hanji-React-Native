import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Favorite = {
  name: string;
  conjugationName: string;
  honorific: boolean;
};

export const FAVORITES_KEY = "@favorites_Key";

const useGetFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem(FAVORITES_KEY);
        if (value !== null) {
          setFavorites(JSON.parse(value));
        } else {
          setFavorites([]);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [setFavorites, setLoading, setError]);

  return { favorites, loading, error };
};

export default useGetFavorites;
