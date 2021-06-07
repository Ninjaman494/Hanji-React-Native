import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useHistory } from "react-router";
import useGetFavorites from "../hooks/useGetFavorites";
import useSetFavorites from "../hooks/useSetFavorites";

const DEFAULT_FAVORITES = [
  {
    name: "Past",
    conjugationName: "declarative past informal high",
    honorific: false,
  },
  {
    name: "Present",
    conjugationName: "declarative present informal high",
    honorific: false,
  },
  {
    name: "Future",
    conjugationName: "declarative future informal high",
    honorific: false,
  },
];

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();
  const { favorites } = useGetFavorites();
  const { setFavorites } = useSetFavorites();

  const doSearch = () => {
    if (searchQuery) {
      history.push(`/search?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    if (favorites === null) {
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
