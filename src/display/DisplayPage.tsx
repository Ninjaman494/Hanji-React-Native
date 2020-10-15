import React from "react";
import { List, Headline, Subheading, Text } from "react-native-paper";
import useGetEntry from "../hooks/useGetEntry";
import BaseCard from "./BaseCard";
import { useParams } from "react-router";
import LoadingScreen from "../utils/LoadingScreen";
import { StyleSheet } from "react-native";

const DisplayPage: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useGetEntry(id);

  const entry = data?.entry;

  return (
    <>
      {loading && <LoadingScreen text="Loading" />}
      {error && <Text>Error</Text>}
      {entry && (
        <>
          <BaseCard style={styles.card}>
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
            <BaseCard title="Note" style={styles.card}>
              <Text>{entry.note}</Text>
            </BaseCard>
          )}
          {entry?.examples && (
            <BaseCard title={"Examples"} style={styles.card}>
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
            <BaseCard title="Synonyms" style={styles.card}>
              <Text style={{ paddingLeft: 16, fontSize: 16 }}>
                {entry.synonyms.join(", ")}
              </Text>
            </BaseCard>
          )}
          {entry?.antonyms && (
            <BaseCard title="Antonyms" style={styles.card}>
              <Text style={{ paddingLeft: 16, fontSize: 16 }}>
                {entry.antonyms.join(", ")}
              </Text>
            </BaseCard>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});

export default DisplayPage;
