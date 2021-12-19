jest.mock("expo-store-review");
jest.mock("@react-native-async-storage/async-storage");

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as StoreReview from "expo-store-review";
import RatingHandler from "providers/RatingHandler";
import React from "react";
import { render, waitFor } from "utils/testUtils";

jest.spyOn(StoreReview, "hasAction").mockReturnValue(Promise.resolve(true));

describe("RatingHandler component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows rating after x sessions", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) =>
      key === "NUM_SESSIONS" ? "5" : "false"
    );

    render(<RatingHandler numSessions={5} />);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("NUM_SESSIONS", "6");
      expect(StoreReview.requestReview).toHaveBeenCalled();
    });
  });

  it("does not show rating before x sessions", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) =>
      key === "NUM_SESSIONS" ? "3" : "false"
    );

    render(<RatingHandler numSessions={5} />);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("NUM_SESSIONS", "4");
      expect(StoreReview.requestReview).not.toHaveBeenCalled();
    });
  });

  it("does not show rating if already shown", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) =>
      key === "NUM_SESSIONS" ? "5" : "true"
    );

    render(<RatingHandler numSessions={5} />);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("NUM_SESSIONS", "6");
      expect(StoreReview.requestReview).not.toHaveBeenCalled();
    });
  });
});
