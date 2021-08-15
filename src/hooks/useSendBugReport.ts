import { gql, MutationTuple, useMutation } from "@apollo/client";
import { ReactNativeFile } from "extract-files";

const SEND_REPORT = gql`
  mutation SendBugReport(
    $feedback: String!
    $email: String
    $type: BugReportType!
    $image: Upload
  ) {
    sendBugReport(
      feedback: $feedback
      email: $email
      type: $type
      image: $image
    ) {
      success
      message
    }
  }
`;

export enum ReportType {
  BUG = "BUG",
  NEW_FEATURE = "NEW_FEATURE",
  OTHER = "OTHER",
}

interface SendBugRequestVars {
  feedback: string;
  email?: string;
  type: ReportType;
  image?: ReactNativeFile;
}

interface BugReportResponse {
  success: boolean;
  message: string;
}

const useSendBugReport = (): MutationTuple<
  BugReportResponse,
  SendBugRequestVars
> => useMutation<BugReportResponse, SendBugRequestVars>(SEND_REPORT);

export default useSendBugReport;
