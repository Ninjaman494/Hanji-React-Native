import React, { useEffect } from "react";
import { Text } from "react-native-paper";
import { useHistory } from "react-router";
import useSearch from "hooks/useSearch";
import { LoadingScreen } from "components";
import SearchResultsPage from "pages/searchResults/SearchResultsPage";
import useGetURLParams from "hooks/useGetURLParams";

const SearchPage: React.FC = () => {
  const query = useGetURLParams().get("query");
  const history = useHistory();

  if (query) {
    const { loading, data, error } = useSearch(query as string, null);
    const results = data?.search?.results;

    useEffect(() => {
      if (results?.length === 1) {
        history.replace(`/display?id=${results[0].id}`);
      }
    }, [results]);

    return (
      <>
        {loading && <LoadingScreen text="Searching..." />}
        {error && <Text>Error: {error}</Text>}
        {results && results.length > 1 && (
          <SearchResultsPage
            query={query}
            results={results}
            cursor={data?.search?.cursor}
          />
        )}
      </>
    );
  } else {
    return <Text>No query provided</Text>;
  }
};

export default SearchPage;
