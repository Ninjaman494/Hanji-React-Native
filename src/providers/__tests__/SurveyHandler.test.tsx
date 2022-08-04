jest.mock("hooks/useGetAdFreeStatus");
jest.mock("@react-native-async-storage/async-storage");

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import SurveyHandler, { FILLED_OUT_KEY } from "providers/SurveyHandler";
import React from "react";
import { fireEvent, render, waitFor } from "utils/testUtils";

(useGetAdFreeStatus as jest.Mock).mockReturnValue({ sessionCount: 5 });

const { navigate } = useNavigation();

const mockAsyncStorage = (filledOut: boolean, lastAsked?: Date) => {
  (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
    if (key === FILLED_OUT_KEY) {
      return filledOut ? "true" : "false";
    }

    return lastAsked?.getTime();
  });
};

describe("SurveyHandler", () => {
  it("displays survey after 5 sessions", async () => {
    mockAsyncStorage(false);

    const result = render(<SurveyHandler />);

    await waitFor(() =>
      expect(result.getByText("We need your feedback!")).toBeTruthy()
    );

    fireEvent.press(result.getByText("Ok"));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith("Survey"));
  });

  it("asks again after 5 days", async () => {
    mockAsyncStorage(false, new Date(Date.now() - 432000000)); // 5 days ago

    const result = render(<SurveyHandler />);

    await waitFor(() =>
      expect(result.getByText("We need your feedback!")).toBeTruthy()
    );

    fireEvent.press(result.getByText("Ok"));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith("Survey"));
  });
});
