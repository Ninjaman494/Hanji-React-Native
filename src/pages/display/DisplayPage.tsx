import notifee from "@notifee/react-native";
import { AdCard, AppBar, AppLayout, BaseCard } from "components";
import { SlideInBody, SlideInTop } from "components/animations";
import useConjugations from "hooks/useConjugations";
import useGetEntry, { Entry } from "hooks/useGetEntry";
import useGetFavorites from "hooks/useGetFavorites";
import {
  hasAskedNotificationPermission,
  setAskedNotificationPermission,
} from "logging/notificationsPermission";
import React, { useEffect, useMemo } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { PageName, ScreenProps } from "typings/navigation";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import DefPosCard from "./components/DefPosCard";
import ExamplesCard from "./components/ExamplesCard";
import FavoritesCard from "./components/FavoritesCard";

const DisplayPage: React.FC<ScreenProps<PageName.DISPLAY>> = ({
  route,
  navigation,
}) => {
  const id = route.params.entryId;

  // Get favorites from storage, use defaults if none are written
  const { favorites } = useGetFavorites();
  const favConjugations = favorites?.map(({ conjugationName, honorific }) => ({
    name: conjugationName,
    honorific,
  }));

  const {
    loading: entryLoading,
    error: entryError,
    data: entryData,
  } = useGetEntry(id as string);
  const entry = entryData?.entry;

  const stem = entry?.term as string;
  const isAdj = entry?.pos === "Adjective";
  const isAdjVerb = isAdj || entry?.pos === "Verb";
  const regular = entry?.regular;

  useEffect(() => {
    if (entry) {
      logEvent({
        type: LOG_EVENT.SELECT_CONTENT,
        params: { item_id: entry.term, content_type: entry.pos },
      });
    }
  }, [entry]);

  // Ask permission after they start using the app instead of
  // as soon as it launches
  useEffect(() => {
    if (!entry) return;

    const timeout = setTimeout(async () => {
      const hasAsked = await hasAskedNotificationPermission();
      if (!hasAsked) {
        await notifee.requestPermission();
        await setAskedNotificationPermission(true);
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, [entry]);

  const {
    loading: conjLoading,
    error: conjError,
    data: conjData,
  } = useConjugations(
    {
      input: {
        stem,
        isAdj,
        regular,
        conjugations: favConjugations,
      },
    },
    {
      skip:
        !entry ||
        !isAdjVerb ||
        !favConjugations ||
        favConjugations?.length === 0,
    }
  );
  const conjugations = conjData?.getConjugations;

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
              <Text style={styles.cardText}>{entry.note}</Text>
            </BaseCard>
          )}
          {isAdjVerb && (
            <FavoritesCard
              favorites={favorites ?? []}
              conjugations={conjugations}
              title="Conjugations"
              style={styles.card}
              onPress={() =>
                navigation.push(PageName.CONJUGATIONS, {
                  stem,
                  isAdj,
                  regular,
                  honorific: false,
                  alwaysHonorific: entry.alwaysHonorific,
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
              <Text style={styles.cardText}>{entry.synonyms.join(", ")}</Text>
            </BaseCard>
          )}
          {entry?.antonyms && (
            <BaseCard title="Antonyms" style={styles.card}>
              <Text style={styles.cardText}>{entry.antonyms.join(", ")}</Text>
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
  cardText: {
    paddingHorizontal: 16,
    fontSize: 20,
  },
});

export default DisplayPage;
