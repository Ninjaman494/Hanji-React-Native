import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useHistory } from "react-router";
import useSetFavorites from "../hooks/useSetFavorites";

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();

  const doSearch = () => {
    if (searchQuery) {
      history.push(`/search?query=${searchQuery}`);
    }
  };

  const loading = useSetFavorites([
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
  ]);

  return (
    <View style={styles.container}>
      {loading && <div>Saving favorites</div>}
      {!loading && <div>Favorites saved!</div>}
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
