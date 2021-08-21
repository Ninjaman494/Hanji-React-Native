import { AppLayout, BaseCard } from "components";
import { SlideInScrollView } from "components/SlideInAnimator";
import useGetEntry, { Entry } from "hooks/useGetEntry";
import useGetFavorites, { Favorite } from "hooks/useGetFavorites";
import useGetFavoritesConjugations from "hooks/useGetFavoritesConjugations";
import useGetURLParams from "hooks/useGetURLParams";
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useHistory } from "react-router";
import DefPosCard from "./components/DefPosCard";
import ExamplesCard from "./components/ExamplesCard";
import FavoritesCard from "./components/FavoritesCard";

const DisplayPage: React.FC = () => {
  const history = useHistory();
  const id = useGetURLParams().get("id");

  // Get favorites from storage, use defaults if none are written
  const { favorites } = useGetFavorites();

  const {
    loading: entryLoading,
    error: entryError,
    data: entryData,
  } = useGetEntry(id as string);
  const entry = entryData?.entry;

  const stem = entry?.term;
  const isAdj = entry?.pos === "Adjective";
  const honorific = false;

  const isAdjVerb = isAdj || entry?.pos === "Verb";

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
      skip: !entry || !isAdjVerb || favorites?.length === 0,
    }
  );
  const conjugations = conjData?.favorites;

  return (
    <>
      <AppLayout
        loading={entryLoading || conjLoading}
        error={entryError ? entryError.message : conjError?.message}
      >
        <SlideInScrollView shouldAnimate>
          <DefPosCard entry={entry as Entry} style={styles.card} />
          {entry?.note && (
            <BaseCard title="Note" style={styles.card}>
              <Text>{entry.note}</Text>
            </BaseCard>
          )}
          {isAdjVerb && (
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
        </SlideInScrollView>
      </AppLayout>
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
