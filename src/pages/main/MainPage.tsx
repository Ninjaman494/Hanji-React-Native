import React, { useEffect, useState } from "react";
import { Searchbar, useTheme, Text } from "react-native-paper";
import { Animated, StyleSheet, View } from "react-native";
import { useHistory } from "react-router";
import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import {
  ConjugationName,
  ConjugationType,
  Formality,
} from "utils/conjugationTypes";
import WODCard from "./WODCard";
import SlideInAnimator from "components/SlideInAnimator";
import { useFonts, Laila_500Medium } from "@expo-google-fonts/laila";
import AppLoading from "expo-app-loading";

const DEFAULT_FAVORITES = [
  {
    name: "Past",
    conjugationName:
      `${ConjugationType.DECLARATIVE_PAST} ${Formality.INFORMAL_HIGH}` as ConjugationName,
    honorific: false,
  },
  {
    name: "Present",
    conjugationName:
      `${ConjugationType.DECLARATIVE_PRESENT} ${Formality.INFORMAL_HIGH}` as ConjugationName,
    honorific: false,
  },
  {
    name: "Future",
    conjugationName:
      `${ConjugationType.DECLARATIVE_FUTURE} ${Formality.INFORMAL_HIGH}` as ConjugationName,
    honorific: false,
  },
];

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();
  const { favorites, loading, error } = useGetFavorites();
  const { setFavorites } = useSetFavorites();
  const { colors } = useTheme();

  const [fontLoaded] = useFonts({
    Laila_500Medium,
    "Hangang-Bold": require("../../../assets/hangang-B.ttf"),
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    appBar: {
      backgroundColor: colors.primary,
      justifyContent: "center",
    },
    card: {
      marginVertical: 8,
      marginHorizontal: 16,
    },
    scrollView: {
      marginTop: -32,
      flexGrow: 1,
      paddingBottom: 8,
    },
    titleContainer: {
      fontSize: 48,
      fontFamily: "Laila_500Medium",
      color: "#FFFFFF",
      textAlign: "center",
    },
    title: {
      fontFamily: "inherit",
      color: "inherit",
    },
  });

  const doSearch = () => {
    if (searchQuery) {
      history.push(`/search?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    if (favorites === null && !loading && !error) {
      setFavorites(DEFAULT_FAVORITES);
    }
  }, [favorites, loading, error, DEFAULT_FAVORITES, setFavorites]);

  return !fontLoaded ? (
    <AppLoading />
  ) : (
    <View style={styles.container}>
      <SlideInAnimator
        topComponent={
          <Text style={styles.titleContainer}>
            <Text style={[styles.title, { fontFamily: "Hangang-Bold" }]}>
              한지
            </Text>
            <Text style={styles.title}> |Hanji</Text>
          </Text>
        }
        topStyles={styles.appBar}
        bottomComponent={(props) => (
          <Animated.ScrollView {...props}>
            <Searchbar
              placeholder="Search in Korean or English..."
              onChangeText={(query: string) => setSearchQuery(query)}
              value={searchQuery}
              onSubmitEditing={doSearch}
              onIconPress={doSearch}
              style={styles.card}
            />
            <WODCard style={styles.card} />
          </Animated.ScrollView>
        )}
        bottomStyles={styles.scrollView}
        shouldAnimate
      />
    </View>
  );
};

export default MainPage;
