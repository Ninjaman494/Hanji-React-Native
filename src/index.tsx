import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Button, Text} from "react-native-paper";
import getEntry from "./hooks/getEntry";

export default function Index() {
  const { loading, error, data } = getEntry('가다0');

  return (
    <View style={styles.container}>
      {loading && <Text>Loading</Text>}
      {error && <Text>Error</Text>}
      {data && <Text>{data.entry.term}</Text>}
      <Button mode="contained" onPress={() => {}}>
        click me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
