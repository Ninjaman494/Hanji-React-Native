import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useHistory } from "react-router";

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();

  const doSearch = () => {
    if (searchQuery) {
      history.push(`/search?query=${searchQuery}`);
    }
  };

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
