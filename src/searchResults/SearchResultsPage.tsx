import { Entry } from "../hooks/useGetEntry";
import React from "react";
import { FlatList } from "react-native";
import { Headline, List, Subheading, Title } from "react-native-paper";
import BaseCard from "../display/BaseCard";
// @ts-ignore
import { Link } from "../routing";

export interface SearchResultsPageProps {
  results: Entry[];
  cursor: number | null | undefined;
}

const ResultCard: React.FC<{ result: Entry }> = ({ result }) => {
  return (
    <Link to={`/display/${result.id}`} style={{ textDecoration: "none" }}>
      <BaseCard style={{ margin: 8 }}>
        <Headline style={{ paddingLeft: 16 }}>{result.term}</Headline>
        <Subheading style={{ paddingLeft: 16 }}>{result.pos}</Subheading>
        <List.Section>
          {result.definitions.map((definition, index) => (
            <List.Item
              title={definition}
              style={{ paddingVertical: 0 }}
              key={index}
            />
          ))}
        </List.Section>
      </BaseCard>
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
