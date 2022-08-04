import { gql, MutationTuple, useMutation } from "@apollo/client";

const CREATE_SUBMISSION = gql`
  mutation CreateSubmission($submission: [Question]!) {
    createSurveySubmission(submission: $submission) {
      success
      message
    }
  }
`;

interface SurveySubmissionVars {
  submission: { question: string; response: string }[];
}

interface SurveySubmissionResponse {
  success: boolean;
  message: string;
}

const useCreateSurveySubmission = (): MutationTuple<
  SurveySubmissionResponse,
  SurveySubmissionVars
> =>
  useMutation<SurveySubmissionResponse, SurveySubmissionVars>(
    CREATE_SUBMISSION
  );

export default useCreateSurveySubmission;
