import { Entry } from "../hooks/useGetEntry";
import React from "react";
import { FlatList } from "react-native";
import { TouchableRipple } from "react-native-paper";
// @ts-ignore
import { Link } from "../routing";
import DefPosCard from "../utils/DefPosCard";
import AppBar from "../utils/AppBar";

export interface SearchResultsPageProps {
  query: string;
  results: Entry[];
  cursor: number | null | undefined;
}

const ResultCard: React.FC<{ result: Entry }> = ({ result }) => {
  return (
    <TouchableRipple onPress={() => {}} rippleColor="rgba(0, 0, 0, .32)">
      <Link to={`/display?id=${result.id}`} style={{ textDecoration: "none" }}>
        <DefPosCard entry={result} />
      </Link>
    </TouchableRipple>
  );
};

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  results,
}) => {
  return (
    <>
      <AppBar title={`Results for: ${query}`} />
      <FlatList
        data={results}
        renderItem={({ item }) => <ResultCard result={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default SearchResultsPage;
