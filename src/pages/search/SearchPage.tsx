import { AppBar, LoadingScreen } from "components";
import ErrorDialog from "components/ErrorDialog";
import useSearch from "hooks/useSearch";
import SearchResultsPage from "pages/searchResults/SearchResultsPage";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { ScreenProps } from "typings/navigation";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import NoResultsModal from "./NoResultsModal";

const SearchPage: React.FC<ScreenProps<"Search">> = ({ route, navigation }) => {
  const { query } = route.params;

  if (query) {
    const { data, error } = useSearch(query as string, null);
    const results = data?.search?.results;

    useEffect(() => {
      logEvent({ type: LOG_EVENT.SEARCH, params: { search_term: query } });
    }, []);

    useEffect(() => {
      if (results?.length === 1) {
        navigation.replace("Display", {
          entryId: results[0].id,
          noAnimate: true,
        });
      }
    }, [results]);

    return (
      <>
        {results && results.length > 1 ? (
          <SearchResultsPage
            query={query}
            results={results}
            cursor={data?.search?.cursor}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <AppBar hideSearch />
            <LoadingScreen text="Searching..." />
          </View>
        )}
        {error && (
          <ErrorDialog error={error} onDismiss={navigation.goBack} visible />
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
