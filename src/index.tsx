import React from "react";
import { StyleSheet, View } from "react-native";
import { List, Headline, Subheading, Text } from "react-native-paper";
import getEntry from "./hooks/getEntry";
import BaseCard from "./display/BaseCard";

export default function Index() {
  const { loading, error, data } = getEntry("있다0");
  const entry = data?.entry;

  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        {loading && <Text>Loading</Text>}
        {error && <Text>Error</Text>}
        {entry && (
          <>
            <BaseCard>
              <Headline style={{ paddingLeft: 16 }}>{entry.term}</Headline>
              <Subheading style={{ paddingLeft: 16 }}>{entry.pos}</Subheading>
              <List.Section>
                {entry.definitions.map((definition, index) => (
                  <List.Item
                    title={definition}
                    style={{ paddingVertical: 0 }}
                    key={index}
                  />
                ))}
              </List.Section>
            </BaseCard>
            {entry?.note && (
              <BaseCard title="Note">
                <Text>{entry.note}</Text>
              </BaseCard>
            )}
            {entry?.examples && (
              <BaseCard title={"Examples"}>
                <List.Section>
                  {entry.examples.map((example, index) => (
                    <List.Item
                      title={example.sentence}
                      description={example.translation}
                      style={{ paddingVertical: 0 }}
                      key={index}
                    />
                  ))}
                </List.Section>
              </BaseCard>
            )}
            {entry?.synonyms && (
              <BaseCard title="Synonyms">
                <Text style={{ paddingLeft: 16, fontSize: 16 }}>
                  {entry.synonyms.join(", ")}
                </Text>
              </BaseCard>
            )}
            {entry?.antonyms && (
              <BaseCard title="Synonyms">
                <Text style={{ paddingLeft: 16, fontSize: 16 }}>
                  {entry.antonyms.join(", ")}
                </Text>
              </BaseCard>
            )}
          </>
        )}
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
