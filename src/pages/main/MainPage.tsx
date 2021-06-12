import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useHistory } from "react-router";
import useGetFavorites, { Favorite } from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import { ConjugationType, Formality } from "hooks/useGetConjugationNames";

const DEFAULT_FAVORITES: Favorite[] = [
  {
    name: "Past",
    conjugationName: `${ConjugationType.DECLARATIVE_PAST} ${Formality.INFORMAL_HIGH}`,
    honorific: false,
  },
  {
    name: "Present",
    conjugationName: `${ConjugationType.DECLARATIVE_PRESENT} ${Formality.INFORMAL_HIGH}`,
    honorific: false,
  },
  {
    name: "Future",
    conjugationName: `${ConjugationType.DECLARATIVE_FUTURE} ${Formality.INFORMAL_HIGH}`,
    honorific: false,
  },
];

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();
  const { favorites, loading, error } = useGetFavorites();
  const { setFavorites } = useSetFavorites();

  const doSearch = () => {
    if (searchQuery) {
      history.push(`/search?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    if (favorites === null && !loading && !error) {
      setFavorites(DEFAULT_FAVORITES);
    }
  }, [favorites, DEFAULT_FAVORITES, setFavorites]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search in Korean or English..."
        onChangeText={(query: string) => setSearchQuery(query)}
        value={searchQuery}
        onSubmitEditing={doSearch}
        onIconPress={doSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "stretch",
    justifyContent: "center",
  },
});

export default MainPage;
