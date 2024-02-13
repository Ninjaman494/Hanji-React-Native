jest.mock("react-native-purchases");

import { renderHook, waitFor } from "@testing-library/react-native";
import useCheckPurchasesConfigured from "hooks/useCheckPurchasesConfigured";
import Purchases from "react-native-purchases";

describe("useCheckPurchasesConfigured hook", () => {
  it("keeps retrying until Purchases in configured", async () => {
    jest.useFakeTimers();
    (Purchases.isConfigured as jest.Mock).mockResolvedValueOnce(true);

    const { result, rerender } = renderHook(() =>
      useCheckPurchasesConfigured()
    );

    expect(result.current).toBeFalsy();

    // Wait a minute and verify updated value is true
    jest.advanceTimersToNextTimer();
    rerender(() => useCheckPurchasesConfigured());

    await waitFor(() => {
      expect(result.current).toBeTruthy();
    });
  });
});
