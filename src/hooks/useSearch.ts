import { gql, QueryResult, useQuery } from "@apollo/client";
import { Entry } from "hooks/useGetEntry";

export const SEARCH = gql`
  query SearchQuery($query: String!, $cursor: Int) {
    search(query: $query, cursor: $cursor) {
      results {
        id
        term
        pos
        definitions
      }
      cursor
      autocorrected
    }
  }
`;

export type SearchResponse = {
  search: {
    results: Entry[];
    cursor: number | null;
    autocorrected: string | null;
  };
};

export default function useGetEntry(
  query: string,
  cursor: number | null
): QueryResult<SearchResponse> {
  return useQuery<SearchResponse>(SEARCH, { variables: { query, cursor } });
}
