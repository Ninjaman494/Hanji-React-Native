import { AdCard, AppBar, AppLayout, BaseCard } from "components";
import { SlideInBody, SlideInTop } from "components/animations";
import useConjugations from "hooks/useConjugations";
import useGetEntry, { Entry } from "hooks/useGetEntry";
import useGetFavorites, { Favorite } from "hooks/useGetFavorites";
import React, { useEffect, useMemo } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ScreenProps } from "typings/navigation";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import DefPosCard from "./components/DefPosCard";
import ExamplesCard from "./components/ExamplesCard";
import FavoritesCard from "./components/FavoritesCard";

const DisplayPage: React.FC<ScreenProps<"Display">> = ({
  route,
  navigation,
}) => {
  const id = route.params.entryId;

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

  useEffect(() => {
    if (entry) {
      logEvent({
        type: LOG_EVENT.SELECT_CONTENT,
        params: { item_id: entry.term, content_type: entry.pos },
      });
    }
  }, [entry]);

  const {
    loading: conjLoading,
    error: conjError,
    data: conjData,
  } = useConjugations(
    {
      stem: stem as string,
      isAdj: isAdj,
      honorific: false, // Required in conjugations, is ignored by server
      conjugations: favorites as Favorite[],
    },
    {
      skip: !entry || !isAdjVerb || favorites?.length === 0,
    }
  );
  const conjugations = conjData?.conjugations;

  const scrollY = useMemo(() => new Animated.Value(150), []);
  const containerY = useMemo(() => new Animated.Value(0), []);

  const isLoading = entryLoading || conjLoading;
  const error = entryError || conjError;
  return (
    <View style={{ flex: 1 }}>
      <SlideInTop scrollY={scrollY} shouldAnimate={!isLoading && !error}>
        <AppBar />
      </SlideInTop>
      <AppLayout loading={isLoading} error={error}>
        <SlideInBody
          shouldAnimate
          scrollY={scrollY}
          containerY={containerY}
          flatlist={false}
        >
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
                navigation.push("Conjugations", {
                  stem: stem as string,
                  isAdj,
                  honorific,
                })
              }
            />
          )}
          <AdCard style={styles.card} />
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
        </SlideInBody>
      </AppLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  synAnt: {
    paddingHorizontal: 16,
    fontSize: 20,
  },
});

export default DisplayPage;
