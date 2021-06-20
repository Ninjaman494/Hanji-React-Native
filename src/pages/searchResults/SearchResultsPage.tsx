import { Entry } from "hooks/useGetEntry";
import React from "react";
import { FlatList } from "react-native";
import { TouchableRipple } from "react-native-paper";
// @ts-ignore
import { Link } from "routing";
import { AppLayout } from "components";
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
      <FlatList
        data={results}
        renderItem={({ item }) => <ResultCard result={item} />}
        keyExtractor={(item) => item.id}
      />
    </AppLayout>
  );
};

export default SearchResultsPage;
