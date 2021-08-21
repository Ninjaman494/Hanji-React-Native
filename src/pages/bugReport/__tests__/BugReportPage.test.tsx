jest.mock("hooks/useSendBugReport");
jest.mock("components/SnackbarProvider");
jest.mock("react-router-native");

import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { useSnackbar } from "components/SnackbarProvider";
import { ReactNativeFile } from "extract-files";
import useSendBugReport, { ReportType } from "hooks/useSendBugReport";
import React from "react";
import "react-native";
import { useHistory, useLocation } from "react-router-native";
import BugReportPage from "../BugReportPage";

const deviceInfo = {
  version: "1.0.0",
  brand: "google",
  manufacturer: "LTE",
  model: "Pixel",
  sdkVersion: "4.2.0",
};

jest.mock("expo-constants", () => ({ nativeAppVersion: deviceInfo.version }));
jest.mock("expo-device", () => ({
  brand: deviceInfo.brand,
  manufacturer: deviceInfo.manufacturer,
  modelName: deviceInfo.model,
  osVersion: deviceInfo.sdkVersion,
}));

const sendBugReport = jest.fn();
(useSendBugReport as jest.Mock).mockReturnValue([sendBugReport]);

(useLocation as jest.Mock).mockReturnValue({
  state: {
    screenshot: "screenshot",
  },
});

const goBack = jest.fn();
(useHistory as jest.Mock).mockReturnValue({
  goBack,
});

const showSnackbar = jest.fn();
(useSnackbar as jest.Mock).mockReturnValue({ showSnackbar });

describe("BugReportPage", () => {
  beforeEach(() => jest.clearAllMocks());

  it("submits feedback with photo", async () => {
    const result = render(<BugReportPage />);

    fireEvent.changeText(result.getByLabelText("Feedback"), "foobar");
    fireEvent.changeText(
      result.getByLabelText("Email (optional)"),
      "test@email.com"
    );
    fireEvent.press(result.getByText("Submit"));

    await waitFor(() => {
      expect(sendBugReport).toHaveBeenCalledWith({
        variables: {
          feedback: "foobar",
          type: ReportType.BUG,
          email: "test@email.com",
          image: new ReactNativeFile({
            name: "screenshot.png",
            type: "image/png",
            uri: "screenshot",
          }),
          deviceInfo,
        },
      });
      expect(showSnackbar).toHaveBeenCalledWith(
        "Report sent. Thanks for the feedback!"
      );
      expect(goBack).toHaveBeenCalled();
    });
  });

  it("submits feedback without photo", async () => {
    const result = render(<BugReportPage />);

    fireEvent.changeText(result.getByLabelText("Feedback"), "foobar");
    fireEvent.changeText(
      result.getByLabelText("Email (optional)"),
      "test@email.com"
    );
    fireEvent.press(result.getByLabelText("Include screenshot?"));
    fireEvent.press(result.getByText("Submit"));

    await waitFor(() => {
      expect(sendBugReport).toHaveBeenCalledWith({
        variables: {
          feedback: "foobar",
          type: ReportType.BUG,
          email: "test@email.com",
          deviceInfo,
        },
      });
      expect(showSnackbar).toHaveBeenCalledWith(
        "Report sent. Thanks for the feedback!"
      );
      expect(goBack).toHaveBeenCalled();
    });
  });

  it("handles a submission error", async () => {
    const sendBugReport = jest.fn().mockRejectedValue("Error");
    (useSendBugReport as jest.Mock).mockReturnValue([sendBugReport]);

    const result = render(<BugReportPage />);

    fireEvent.changeText(result.getByLabelText("Feedback"), "foobar");
    fireEvent.changeText(
      result.getByLabelText("Email (optional)"),
      "test@email.com"
    );
    fireEvent.press(result.getByText("Submit"));

    await waitFor(() => {
      expect(sendBugReport).toHaveBeenCalledWith({
        variables: {
          feedback: "foobar",
          type: ReportType.BUG,
          email: "test@email.com",
          image: new ReactNativeFile({
            name: "screenshot.png",
            type: "image/png",
            uri: "screenshot",
          }),
          deviceInfo,
        },
      });
      expect(showSnackbar).toHaveBeenCalledWith(
        "An error occurred. Please try again later"
      );
      expect(goBack).not.toHaveBeenCalled();
    });
  });
});
