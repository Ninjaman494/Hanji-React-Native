import { gql, MutationTuple, useMutation } from "@apollo/client";

const CREATE_SUGGESTION = gql`
  mutation CreateSuggestion($suggestion: EntrySuggestionInput!) {
    createEntrySuggestion(suggestion: $suggestion) {
      success
      message
    }
  }
`;

interface CreateSuggestionVars {
  suggestion: {
    entryID: string;
    antonyms?: string[];
    synonyms?: string[];
    examples?: {
      sentence: string;
      translation: string;
    }[];
  };
}

interface EntrySuggestionReponse {
  success: boolean;
  message: string;
}

const useCreateSuggestion = (): MutationTuple<
  EntrySuggestionReponse,
  CreateSuggestionVars
> =>
  useMutation<EntrySuggestionReponse, CreateSuggestionVars>(CREATE_SUGGESTION);

export default useCreateSuggestion;
