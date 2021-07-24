import { AppBar } from "components";
import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { List } from "react-native-paper";
import licenses from "./licenses.json";

const AcknowledgementsPage: React.FC = () => {
  const styles = StyleSheet.create({
    parent: {
      flex: 1,
      height: 500,
    },
  });

  return (
    <View style={styles.parent}>
      <AppBar title="Acknowledgements" />
      <List.Section>
        {Object.keys(licenses).map((key) => {
          const matches = key.match(/([a-zA-z-@/]*)(?:@|$)([\d.]+)/);
          return (
            <List.Item
              title={matches?.[1]}
              key={key}
              description={`Version: ${matches?.[2]}`}
              // @ts-expect-error string type isn't specific enough for key
              onPress={() => Linking.openURL(licenses[key]?.repository)}
            />
          );
        })}
      </List.Section>
    </View>
  );
};

export default AcknowledgementsPage;
