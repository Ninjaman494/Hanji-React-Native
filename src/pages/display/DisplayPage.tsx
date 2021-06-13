import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useHistory } from "react-router";
import useGetEntry from "hooks/useGetEntry";
import useGetURLParams from "hooks/useGetURLParams";
import useGetFavorites, { Favorite } from "hooks/useGetFavorites";
import { AppLayout, BaseCard } from "components";
import DefPosCard from "./components/DefPosCard";
import ExamplesCard from "./components/ExamplesCard";
import FavoritesCard from "./components/FavoritesCard";
import useGetFavoritesConjugations from "hooks/useGetFavoritesConjugations";

const DisplayPage: React.FC = () => {
  const history = useHistory();
  const id = useGetURLParams().get("id");

  // Get favorites from storage, use defaults if none are written
  let { favorites } = useGetFavorites();

  const {
    loading: entryLoading,
    error: entryError,
    data: entryData,
  } = useGetEntry(id as string);
  const entry = entryData?.entry;

  const stem = entry?.term;
  const isAdj = entry?.pos === "Adjective";
  const honorific = false;

  const {
    loading: conjLoading,
    error: conjError,
    data: conjData,
  } = useGetFavoritesConjugations(
    {
      stem: stem as string,
      isAdj: isAdj,
      favorites: favorites as Favorite[],
    },
    {
      skip:
        !entry ||
        !["Adjective", "Verb"].includes(entry?.pos) ||
        favorites?.length === 0,
    }
  );
  const conjugations = conjData?.favorites;

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
          <FavoritesCard
            favorites={favorites ?? []}
            conjugations={conjugations}
            title="Conjugations"
            style={styles.card}
            onPress={() =>
              history.push(
                `/conjugation?stem=${stem}&isAdj=${isAdj}&honorific=${honorific}`
              )
            }
          />
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
