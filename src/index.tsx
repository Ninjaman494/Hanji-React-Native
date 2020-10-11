import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import getEntry from "./hooks/getEntry";
import EntryCard from "./components/EntryCard";

export default function Index() {
  const { loading, error, data } = getEntry("있다0");
  const entry = data?.entry;

  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        {loading && <Text>Loading</Text>}
        {error && <Text>Error</Text>}
        {entry && <EntryCard entry={entry} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  container: {
    flex: 1,
    maxWidth: 500,
  },
});
