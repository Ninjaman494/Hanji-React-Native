import { Laila_500Medium, useFonts } from "@expo-google-fonts/laila";
import { AppBar, AppLayout } from "components";
import { SlideInBody, SlideInTop } from "components/animations";
import AppLoading from "expo-app-loading";
import React, { useMemo, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Searchbar, Text } from "react-native-paper";
import { useHistory } from "react-router";
import {
  ConjugationName,
  ConjugationType,
  Formality,
} from "utils/conjugationTypes";
import WODCard from "./WODCard";

export const DEFAULT_FAVORITES = [
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

  const [fontLoaded] = useFonts({
    Laila_500Medium,
    "Hangang-Bold": require("../../../assets/hangang-B.ttf"),
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      marginVertical: 8,
      marginHorizontal: 16,
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

  const scrollY = useMemo(() => new Animated.Value(150), []);
  const containerY = useMemo(() => new Animated.Value(0), []);

  return !fontLoaded ? (
    <AppLoading />
  ) : (
    <View style={styles.container}>
      <SlideInTop shouldAnimate scrollY={scrollY} extendedHeight={200}>
        <AppBar hideBack hideSearch />
        <Text style={styles.titleContainer}>
          <Text style={[styles.title, { fontFamily: "Hangang-Bold" }]}>
            한지
          </Text>
          <Text style={styles.title}> |Hanji</Text>
        </Text>
      </SlideInTop>
      <AppLayout>
        <SlideInBody
          scrollY={scrollY}
          containerY={containerY}
          flatlist={false}
          minimumHeight={80}
          shouldAnimate
        >
          <Searchbar
            placeholder="Search in Korean or English..."
            onChangeText={(query: string) => setSearchQuery(query)}
            value={searchQuery}
            onSubmitEditing={doSearch}
            onIconPress={doSearch}
            searchAccessibilityLabel="search button"
            style={styles.card}
          />
          <WODCard style={styles.card} />
        </SlideInBody>
      </AppLayout>
    </View>
  );
};

export default MainPage;
