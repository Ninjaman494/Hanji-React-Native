import { useLazyQuery } from "@apollo/client";
import { SEARCH, SearchResponse } from "./useSearch";

export default function useLazySearch() {
  return useLazyQuery<
    SearchResponse,
    {
      query: string;
      cursor: number | null;
    }
  >(SEARCH);
}
