import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export enum Formality {
  INFORMAL_LOW = "informal low",
  INFORMAL_HIGH = "informal high",
  FORMAL_LOW = "formal low",
  FORMAL_HIGH = "formal high",
}

export enum Conjugation {
  CONNECTIVE = "connective",
  DECLARATIVE_PRESENT = "declarative present",
  DECLARATIVE_PAST = "declarative past",
  DECLARATIVE_FUTURE = "declarative future",
  DETERMINER = "determiner",
  IMPERATIVE = "imperative",
  INTERROGATIVE_PRESENT = "interrogative present",
  INTERROGATIVE_PAST = "interrogative past",
  VERBAL_NOUN = "verbal noun",
  PREPOSITIVE = "propositive",
  SUPPOSITIVE = "suppositive",
}

export type Favorite = {
  name: string;
  conjugationName: `${Conjugation} ${Formality}`;
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
