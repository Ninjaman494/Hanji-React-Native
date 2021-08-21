import { Laila_500Medium, useFonts } from "@expo-google-fonts/laila";
import { SlideInScrollView, SlideInTop } from "components/SlideInAnimator";
import AppLoading from "expo-app-loading";
import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar, Text, useTheme } from "react-native-paper";
import { useHistory } from "react-router";
import {
  ConjugationName,
  ConjugationType,
  Formality,
} from "utils/conjugationTypes";
import WODCard from "./WODCard";

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
      textAlign: "center",
    },
    title: {
      fontFamily: "Laila_500Medium",
      color: "#ffffff",
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
      <SlideInTop shouldAnimate style={styles.appBar}>
        <Text style={styles.titleContainer}>
          <Text style={[styles.title, { fontFamily: "Hangang-Bold" }]}>
            한지
          </Text>
          <Text style={styles.title}> |Hanji</Text>
        </Text>
      </SlideInTop>
      <SlideInScrollView style={styles.scrollView} shouldAnimate>
        <Searchbar
          placeholder="Search in Korean or English..."
          onChangeText={(query: string) => setSearchQuery(query)}
          value={searchQuery}
          onSubmitEditing={doSearch}
          onIconPress={doSearch}
          style={styles.card}
        />
        <WODCard style={styles.card} />
      </SlideInScrollView>
    </View>
  );
};

export default MainPage;
