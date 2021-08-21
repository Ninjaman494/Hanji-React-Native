import { gql, MutationTuple, useMutation } from "@apollo/client";
import { ReactNativeFile } from "extract-files";

const SEND_REPORT = gql`
  mutation SendBugReport(
    $feedback: String!
    $type: BugReportType!
    $deviceInfo: DeviceInfo!
    $email: String
    $image: Upload
  ) {
    sendBugReport(
      feedback: $feedback
      type: $type
      deviceInfo: $deviceInfo
      email: $email
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

export type DeviceInfo = {
  version: string;
  brand: string;
  manufacturer: string;
  model: string;
  sdkVersion: string;
};

interface SendBugRequestVars {
  feedback: string;
  type: ReportType;
  deviceInfo: DeviceInfo;
  email?: string;
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
