import { AdCard, AppBar, AppLayout } from "components";
import { SlideInBody, SlideInTop } from "components/animations";
import { Entry } from "hooks/useGetEntry";
import React, { useMemo } from "react";
import { Animated, View } from "react-native";
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
  const scrollY = useMemo(() => new Animated.Value(150), []);
  const containerY = useMemo(() => new Animated.Value(0), []);

  const resultsWithAd =
    results.length < 3
      ? [...results, "ad"]
      : [...results.slice(0, 2), "ad", ...results.slice(2)];

  return (
    <View style={{ flex: 1 }}>
      <SlideInTop scrollY={scrollY} shouldAnimate>
        <AppBar title={`Results for: ${query}`} />
      </SlideInTop>
      <AppLayout>
        <SlideInBody
          data={resultsWithAd}
          renderItem={({ item }) =>
            item === "ad" ? (
              <AdCard style={styles.card} />
            ) : (
              <SearchResultsCard entry={item} style={styles.card} />
            )
          }
          keyExtractor={(item) => item.id ?? item}
          scrollY={scrollY}
          containerY={containerY}
          flatlist
          shouldAnimate
        />
      </AppLayout>
    </View>
  );
};

export default SearchResultsPage;
