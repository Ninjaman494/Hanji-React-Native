import React, { useEffect, useState } from "react";
import { Searchbar, useTheme, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
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
    title: {
      fontSize: 48,
      color: "#FFFFFF",
      textAlign: "center",
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

  return (
    <View style={styles.container}>
      <SlideInAnimator
        shouldAnimate={true}
        topComponent={<Text style={styles.title}>한지 |Hanji</Text>}
        topStyles={styles.appBar}
        bottomComponent={
          <>
            <Searchbar
              placeholder="Search in Korean or English..."
              onChangeText={(query: string) => setSearchQuery(query)}
              value={searchQuery}
              onSubmitEditing={doSearch}
              onIconPress={doSearch}
              style={styles.card}
            />
            <WODCard style={styles.card} />
          </>
        }
        bottomStyles={styles.scrollView}
      />
    </View>
  );
};

export default MainPage;
