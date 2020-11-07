import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Favorite, FAVORITES_KEY } from "./useGetFavorites";

const useSetFavorites = (favorites: Favorite[]) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading]);

  return loading;
};

export default useSetFavorites;
