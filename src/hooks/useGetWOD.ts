import { gql, QueryResult, useQuery } from "@apollo/client";

const WORD = gql`
  query WODQuery {
    wordOfTheDay {
      id
      term
    }
  }
`;

type WODResponse = {
  wordOfTheDay: {
    id: string;
    term: string;
  };
};

const useGetWOD = (): QueryResult<WODResponse> => {
  return useQuery<WODResponse>(WORD);
};

export default useGetWOD;
