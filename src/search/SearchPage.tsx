import React from "react";
import { Text, Title } from "react-native-paper";
import { useHistory, useLocation } from "react-router";
import useSearch from "../hooks/useSearch";
import LoadingScreen from "../utils/LoadingScreen";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage: React.FC = () => {
  const query = useQuery().get("query");
  const history = useHistory();

  if (query) {
    const { loading, data, error } = useSearch(query as string, null);
    const results = data?.search?.results;

    return (
      <>
        {loading && <LoadingScreen text="Searching..." />}
        {error && <Text>Error: {error}</Text>}
        {results && (
          <>
            {results?.length === 1 ? (
              history.replace(`/display/${results[0].id}`)
            ) : (
              <>
                <Title>Multiple Results</Title>
                {results?.map((result) => (
                  <Text>{result.term}</Text>
                ))}
              </>
            )}
          </>
        )}
      </>
    );
  } else {
    return <Text>No query provided</Text>;
  }
};

export default SearchPage;
