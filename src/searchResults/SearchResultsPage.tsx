import { Entry } from "../hooks/useGetEntry";
import React from "react";
import { FlatList } from "react-native";
import { Title } from "react-native-paper";
// @ts-ignore
import { Link } from "../routing";
import DefPosCard from "../utils/DefPosCard";

export interface SearchResultsPageProps {
  results: Entry[];
  cursor: number | null | undefined;
}

const ResultCard: React.FC<{ result: Entry }> = ({ result }) => {
  return (
    <Link to={`/display?id=${result.id}`} style={{ textDecoration: "none" }}>
      <DefPosCard entry={result} />
    </Link>
  );
};

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ results }) => {
  return (
    <>
      <Title style={{ paddingBottom: 16 }}>Multiple Results</Title>
      <FlatList
        data={results}
        renderItem={({ item }) => <ResultCard result={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default SearchResultsPage;
