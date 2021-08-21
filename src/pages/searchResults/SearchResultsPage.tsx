import { AppBar, AppLayout } from "components";
import { SlideInBody, SlideInTop } from "components/animations";
import { Entry } from "hooks/useGetEntry";
import React, { useMemo } from "react";
import { Animated, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Link } from "react-router-native";
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

const ResultCard: React.FC<{ result: Entry }> = ({ result }) => {
  return (
    <TouchableRipple onPress={() => null} rippleColor="rgba(0, 0, 0, .32)">
      <Link to={`/display?id=${result.id}`} style={styles.link}>
        <SearchResultsCard entry={result} style={styles.card} />
      </Link>
    </TouchableRipple>
  );
};

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  results,
}) => {
  const scrollY = useMemo(() => new Animated.Value(150), []);
  const containerY = useMemo(() => new Animated.Value(0), []);

  return (
    <View style={{ flex: 1 }}>
      <SlideInTop scrollY={scrollY} shouldAnimate>
        <AppBar title={`Results for: ${query}`} />
      </SlideInTop>
      <AppLayout>
        <SlideInBody
          data={results}
          renderItem={({ item }) => <ResultCard result={item} />}
          keyExtractor={(item) => item.id}
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
