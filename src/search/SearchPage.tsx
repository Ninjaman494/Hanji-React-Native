import React from "react";
import { Text } from "react-native-paper";
import { useLocation } from "react-router";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage: React.FC = () => {
  const query = useQuery().get("query");

  return <Text>{query}</Text>;
};

export default SearchPage;
