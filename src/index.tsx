import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Button, Text} from "react-native-paper";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
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
