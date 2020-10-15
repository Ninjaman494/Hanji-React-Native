import React from "react";
import { List, Text } from "react-native-paper";
import useGetEntry from "../hooks/useGetEntry";
import BaseCard from "../utils/BaseCard";
import LoadingScreen from "../utils/LoadingScreen";
import { StyleSheet } from "react-native";
import DefPosCard from "../utils/DefPosCard";
import AppBar from "../utils/AppBar";
import useGetURLParams from "../hooks/useGetURLParams";
import useConjugations from "../hooks/useConjugations";

const DisplayPage: React.FC = () => {
  const id = useGetURLParams().get("id");

  const {
    loading: entryLoading,
    error: entryError,
    data: entryData,
  } = useGetEntry(id as string);
  const entry = entryData?.entry;

  const {
    loading: conjLoading,
    error: conjError,
    data: conjData,
  } = useConjugations(
    {
      stem: entry?.term as string,
      isAdj: entry?.pos === "Adjective",
      honorific: false,
    },
    {
      skip: !entry || !["Adjective", "Verb"].includes(entry?.pos),
    }
  );
  const conjugations = conjData?.conjugations;

  return (
    <>
      <AppBar />
      {(entryLoading || conjLoading) && <LoadingScreen text="Loading" />}
      {(entryError || conjError) && (
        <Text>Error: {entryError ? entryError : conjError}</Text>
      )}
      {entry && (
        <>
          <DefPosCard entry={entry} />
          {entry?.note && (
            <BaseCard title="Note" style={styles.card}>
              <Text>{entry.note}</Text>
            </BaseCard>
          )}
          {conjugations && (
            <BaseCard title={"Conjugation"} style={styles.card}>
              <List.Section>
                <List.Item
                  title={conjugations[0].name}
                  description={conjugations[0].conjugation}
                />
                <List.Item
                  title={conjugations[1].name}
                  description={conjugations[1].conjugation}
                />
                <List.Item
                  title={conjugations[2].name}
                  description={conjugations[2].conjugation}
                />
              </List.Section>
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
    margin: 8,
  },
});

export default DisplayPage;
