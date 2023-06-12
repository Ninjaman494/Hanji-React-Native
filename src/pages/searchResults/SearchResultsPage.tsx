import { AdCard, AppBar } from "components";
import useSlideUpAnimation from "components/animations/useSlideUpAnimation";
import { Entry } from "hooks/useGetEntry";
import React, { useMemo } from "react";
import { Animated, Dimensions, FlatList, View } from "react-native";
import SearchResultsCard from "./SearchResultsCard";

export interface SearchResultsPageProps {
  query: string;
  results: Entry[];
  cursor: number | null | undefined;
}

const styles = {
  link: {
    textDecoration: "none",
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
};

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  results,
}) => {
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
        style={{ transform: [{ translateY: containerTranslate }] }}
      >
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
