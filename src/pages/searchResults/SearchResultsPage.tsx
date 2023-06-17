import { AdCard, AppBar } from "components";
import useSlideUpAnimation from "components/animations/useSlideUpAnimation";
import { Entry } from "hooks/useGetEntry";
import React, { useMemo } from "react";
import { Animated, Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import SearchResultsCard from "./SearchResultsCard";

export interface SearchResultsPageProps {
  query: string;
  autocorrected: string | null;
  results: Entry[];
  cursor: number | null | undefined;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  autocorrected,
  results,
}) => {
  const { padding } = useTheme();
  const styles = StyleSheet.create({
    listParent: {
      flexGrow: 1,
      height: 500,
    },
    autocorrectText: {
      fontSize: 16,
      marginHorizontal: padding.horizontal,
      marginVertical: padding.vertical,
    },
    query: {
      fontWeight: "bold",
      fontStyle: "italic",
    },
    card: {
      marginVertical: padding.vertical,
      marginHorizontal: padding.horizontal,
    },
  });

  const containerY = useMemo(() => new Animated.Value(0), []);
  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  // Add ad card
  let resultsWithMore =
    results.length < 3
      ? [...results, "ad"]
      : [...results.slice(0, 2), "ad", ...results.slice(2)];

  // Add autocorrect text
  if (autocorrected) resultsWithMore = ["search", ...resultsWithMore];

  useSlideUpAnimation(containerY);

  return (
    <View style={{ flex: 1 }}>
      <AppBar title={`Results for: ${query}`} />
      <Animated.View
        style={{
          ...styles.listParent,
          transform: [{ translateY: containerTranslate }],
        }}
      >
        <FlatList
          contentContainerStyle={{ paddingBottom: padding.vertical }}
          data={resultsWithMore}
          keyExtractor={(item) => (item as any).id ?? item}
          renderItem={({ item }) =>
            item === "ad" ? (
              <AdCard style={styles.card} />
            ) : item === "search" ? (
              <Text style={styles.autocorrectText}>
                <Text>Showing results for </Text>
                <Text style={styles.query}>{`${autocorrected}`}</Text>
              </Text>
            ) : (
              <SearchResultsCard entry={item as Entry} style={styles.card} />
            )
          }
        />
      </Animated.View>
    </View>
  );
};

export default SearchResultsPage;
