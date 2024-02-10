import { AdCard, AppBar } from "components";
import useSlideUpAnimation from "components/animations/useSlideUpAnimation";
import { Entry } from "hooks/useGetEntry";
import useLazySearch from "hooks/useLazySearch";
import React, { useEffect, useMemo, useState } from "react";
import { Animated, Dimensions, FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
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
  cursor: initialCursor,
}) => {
  const { padding, colors } = useTheme();
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
    loadingIndicator: {
      marginBottom: padding.vertical,
    },
  });

  const containerY = useMemo(() => new Animated.Value(0), []);
  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  const [search, { data, loading }] = useLazySearch();

  const [cursor, setCursor] = useState(initialCursor);

  // Add ad card
  const [fullResults, setFullResults] = useState(
    results.length < 3
      ? [...results, "ad"]
      : [...results.slice(0, 2), "ad", ...results.slice(2)]
  );

  // Add autocorrect text
  let resultsWithMore = fullResults;
  if (autocorrected) resultsWithMore = ["search", ...resultsWithMore];

  // Update results when we load more data
  useEffect(() => {
    if (!data) return; // Skip first render

    setCursor(data.search.cursor);
    setFullResults([...fullResults, ...data.search.results]);
  }, [data, setFullResults]);

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
          contentContainerStyle={{ paddingBottom: 50 }}
          data={resultsWithMore}
          keyExtractor={(item) => (item as Entry).id ?? item}
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
          onEndReached={() => {
            cursor != -1 &&
              search({
                variables: { query, cursor: cursor ?? null },
              });
          }}
          onEndReachedThreshold={0.2}
        />
        {loading && (
          <ActivityIndicator
            animating
            color={colors.accent}
            style={styles.loadingIndicator}
            accessibilityHint="loading"
          />
        )}
      </Animated.View>
    </View>
  );
};

export default SearchResultsPage;
