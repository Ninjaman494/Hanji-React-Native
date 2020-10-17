import React from "react";
import { Text } from "react-native-paper";
import useGetEntry from "../hooks/useGetEntry";
import BaseCard from "../components/BaseCard";
import { StyleSheet } from "react-native";
import DefPosCard from "../components/DefPosCard";
import AppLayout from "../components/AppLayout";
import useGetURLParams from "../hooks/useGetURLParams";
import useConjugations from "../hooks/useConjugations";
import ConjugationCard from "./components/ConjugationCard";
import ExamplesCard from "./components/ExamplesCard";

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
      {entry && (
        <AppLayout
          loading={entryLoading || conjLoading}
          error={entryError ? entryError.message : conjError?.message}
        >
          <DefPosCard entry={entry} style={styles.card} />
          {entry?.note && (
            <BaseCard title="Note" style={styles.card}>
              <Text>{entry.note}</Text>
            </BaseCard>
          )}
          {conjugations && (
            <ConjugationCard
              conjugations={conjugations.slice(0, 3)}
              title="Conjugations"
              style={styles.card}
            />
          )}
          {entry?.examples && (
            <ExamplesCard examples={entry.examples} style={styles.card} />
          )}
          {entry?.synonyms && (
            <BaseCard title="Synonyms" style={styles.card}>
              <Text style={styles.synAnt}>{entry.synonyms.join(", ")}</Text>
            </BaseCard>
          )}
          {entry?.antonyms && (
            <BaseCard title="Antonyms" style={styles.card}>
              <Text style={styles.synAnt}>{entry.antonyms.join(", ")}</Text>
            </BaseCard>
          )}
        </AppLayout>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  synAnt: {
    paddingLeft: 16,
    fontSize: 20,
  },
});

export default DisplayPage;
