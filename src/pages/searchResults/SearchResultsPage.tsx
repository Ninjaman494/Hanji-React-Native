import { AppLayout } from "components";
import { SlideInFlatList } from "components/SlideInAnimator";
import { Entry } from "hooks/useGetEntry";
import React from "react";
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
  return (
    <AppLayout title={`Results for: ${query}`}>
      <SlideInFlatList
        data={results}
        renderItem={({ item }) => <ResultCard result={item} />}
        keyExtractor={(item) => item.id}
        shouldAnimate
      />
    </AppLayout>
  );
};

export default SearchResultsPage;
