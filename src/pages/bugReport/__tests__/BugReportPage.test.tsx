jest.mock("hooks/useSendBugReport");
jest.mock("providers/SnackbarProvider");
jest.mock("utils/getUser");
jest.mock("sentry-expo");

import { ReactNativeFile } from "extract-files";
import useSendBugReport, { ReportType } from "hooks/useSendBugReport";
import { useSnackbar } from "providers/SnackbarProvider";
import React from "react";
import "react-native";
import getUser from "utils/getUser";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import { fireEvent, render, waitFor } from "utils/testUtils";
import BugReportPage from "../BugReportPage";

const deviceInfo = {
  version: "1.0.0",
  brand: "google",
  manufacturer: "LTE",
  model: "Pixel",
  sdkVersion: "4.2.0",
};

jest.mock("expo-constants", () => ({
  ...jest.requireActual("expo-constants"),
  nativeAppVersion: deviceInfo.version,
}));
jest.mock("expo-device", () => ({
  brand: deviceInfo.brand,
  manufacturer: deviceInfo.manufacturer,
  modelName: deviceInfo.model,
  osVersion: deviceInfo.sdkVersion,
}));

const sendBugReport = jest.fn();
(useSendBugReport as jest.Mock).mockReturnValue([sendBugReport]);

const showSnackbar = jest.fn();
const showError = jest.fn();
(useSnackbar as jest.Mock).mockReturnValue({ showSnackbar, showError });

const userId = "user-id";
(getUser as jest.Mock).mockReturnValue({ id: userId });

const props = {
  navigation: { goBack: jest.fn() },
  route: {
    params: { screenshot: "screenshot" },
  },
};

describe("BugReportPage", () => {
  it("submits feedback with photo", async () => {
    const result = render(<BugReportPage {...(props as any)} />);

    const feedback = "foobar";
    fireEvent.changeText(result.getByLabelText("Feedback"), feedback);
    fireEvent.press(result.getByText("Submit"));

    await waitFor(() => {
      expect(sendBugReport).toHaveBeenCalledWith({
        variables: {
          type: ReportType.BUG,
          email: userId,
          image: new ReactNativeFile({
            name: "screenshot.png",
            type: "image/png",
            uri: "screenshot",
          }),
          deviceInfo,
          feedback,
        },
      });
      expect(logEvent).toHaveBeenCalledWith({
        type: LOG_EVENT.REPORT_BUG,
        params: {
          type: ReportType.BUG,
          includeImage: true,
          feedback,
        },
      });
      expect(showSnackbar).toHaveBeenCalledWith(
        "Report sent. Thanks for the feedback!"
      );
      expect(props.navigation.goBack).toHaveBeenCalled();
    });
  });

  it("submits feedback without photo", async () => {
    const result = render(<BugReportPage {...(props as any)} />);

    fireEvent.changeText(result.getByLabelText("Feedback"), "foobar");
    fireEvent.press(result.getByLabelText("Include screenshot?"));
    fireEvent.press(result.getByText("Submit"));

    await waitFor(() => {
      expect(sendBugReport).toHaveBeenCalledWith({
        variables: {
          feedback: "foobar",
          type: ReportType.BUG,
          email: userId,
          deviceInfo,
        },
      });
      expect(showSnackbar).toHaveBeenCalledWith(
        "Report sent. Thanks for the feedback!"
      );
      expect(props.navigation.goBack).toHaveBeenCalled();
    });
  });

  it("handles a submission error", async () => {
    const error = new Error();
    const sendBugReport = jest.fn().mockRejectedValue(error);
    (useSendBugReport as jest.Mock).mockReturnValue([sendBugReport]);

    const result = render(<BugReportPage {...(props as any)} />);

    fireEvent.changeText(result.getByLabelText("Feedback"), "foobar");
    fireEvent.press(result.getByText("Submit"));

    await waitFor(() => {
      expect(sendBugReport).toHaveBeenCalledWith({
        variables: {
          feedback: "foobar",
          type: ReportType.BUG,
          email: userId,
          image: new ReactNativeFile({
            name: "screenshot.png",
            type: "image/png",
            uri: "screenshot",
          }),
          deviceInfo,
        },
      });
      expect(showError).toHaveBeenCalledWith(error);
      expect(props.navigation.goBack).not.toHaveBeenCalled();
    });
  });
});
