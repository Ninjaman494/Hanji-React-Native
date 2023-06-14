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
    autocorrectText: {
      fontSize: 16,
      marginHorizontal: padding.horizontal,
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

  const resultsWithAd =
    results.length < 3
      ? [...results, "ad"]
      : [...results.slice(0, 2), "ad", ...results.slice(2)];

  useSlideUpAnimation(containerY);

  return (
    <View style={{ flex: 1 }}>
      <AppBar title={`Results for: ${query}`} />
      <Animated.View
        style={{
          paddingTop: padding.vertical,
          transform: [{ translateY: containerTranslate }],
        }}
      >
        {autocorrected && (
          <Text style={styles.autocorrectText}>
            <Text>Showing results for </Text>
            <Text style={styles.query}>{`${autocorrected}`}</Text>
          </Text>
        )}
        <FlatList
          data={resultsWithAd}
          keyExtractor={(item) => (item as any).id ?? item}
          renderItem={({ item }) =>
            item === "ad" ? (
              <AdCard style={styles.card} />
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
