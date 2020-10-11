import { gql, QueryResult, useQuery } from "@apollo/client";

const ENTRY = gql`
  query EntryQuery($id: ID!) {
    entry(id: $id) {
      id
      term
      pos
      definitions
      antonyms
      synonyms
      examples {
        sentence
        translation
      }
      regular
      note
    }
  }
`;

type Entry = {
  id: string;
  term: string;
  pos: string;
  definitions: string[];
  antonyms?: string[];
  synonyms?: string[];
  examples?: {
    sentence: string;
    translation: string;
  }[];
  regular?: boolean;
  note?: string;
};

type GetEntryResponse = {
  entry: Entry;
};

export default function getEntry(id: string): QueryResult<GetEntryResponse> {
  return useQuery<GetEntryResponse>(ENTRY, { variables: { id: id } });
}
