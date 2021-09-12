import { gql, QueryHookOptions, QueryResult, useQuery } from "@apollo/client";

type StemsResponse = {
  stems?: string[];
};

const STEMS = gql`
  query StemQuery($term: String!) {
    stems(term: $term)
  }
`;

const useGetStems = (
  term: string,
  options?: QueryHookOptions
): QueryResult<StemsResponse> =>
  useQuery<StemsResponse>(STEMS, { variables: { term: term }, ...options });

export default useGetStems;
