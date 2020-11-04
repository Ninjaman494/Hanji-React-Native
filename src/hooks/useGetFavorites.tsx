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
        console.log(e);
      }
    })();
  }, [setFavorites]);

  return favorites;
};

export default useGetFavorites;
