import { LoadingScreen } from "components";
import ErrorDialog from "components/ErrorDialog";
import useSearch from "hooks/useSearch";
import SearchResultsPage from "pages/searchResults/SearchResultsPage";
import React, { useEffect } from "react";
import { Text } from "react-native-paper";
import { ScreenProps } from "typings/navigation";
import NoResultsModal from "./NoResultsModal";

const SearchPage: React.FC<ScreenProps<"Search">> = ({ route, navigation }) => {
  const { query } = route.params;

  if (query) {
    const { loading, data, error } = useSearch(query as string, null);
    const results = data?.search?.results;

    useEffect(() => {
      if (results?.length === 1) {
        navigation.replace("Display", { entryId: results[0].id });
      }
    }, [results]);

    return (
      <>
        {loading && <LoadingScreen text="Searching..." />}
        {error && (
          <ErrorDialog error={error} onDismiss={navigation.goBack} visible />
        )}
        {results && results.length > 1 && (
          <SearchResultsPage
            query={query}
            results={results}
            cursor={data?.search?.cursor}
          />
        )}
        <NoResultsModal
          visible={results?.length === 0}
          query={query}
          onDismiss={navigation.goBack}
          onConjugatorPress={() =>
            navigation.replace("Conjugator", { term: query })
          }
        />
      </>
    );
  } else {
    return <Text>No query provided</Text>;
  }
};

export default SearchPage;
