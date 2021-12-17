jest.mock("@react-native-async-storage/async-storage");
jest.mock("react-native-purchases");
jest.mock("sentry-expo");

import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook } from "@testing-library/react-hooks";
import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import Purchases from "react-native-purchases";
import { Native } from "sentry-expo";
import { waitFor } from "utils/testUtils";

(Purchases.restoreTransactions as jest.Mock).mockResolvedValue({
  entitlements: { active: { ad_free_entitlement: true } },
});

(Purchases.getPurchaserInfo as jest.Mock).mockResolvedValue({
  entitlements: { active: { ad_free_entitlement: true } },
});

describe("useGetAdFreeStatus hook", () => {
  it("gets ad free status from purchaser info", async () => {
    (AsyncStorage.getItem as jest.Mock).mockReturnValue("true");

    const { result } = renderHook(() => useGetAdFreeStatus());

    await waitFor(() => {
      expect(Purchases.getPurchaserInfo).toHaveBeenCalled();
      expect(Purchases.restoreTransactions).not.toHaveBeenCalled();
      expect(result.current).toBeTruthy();
    });
  });

  it("restores purchases if needed", async () => {
    (AsyncStorage.getItem as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useGetAdFreeStatus());
    await waitFor(() => {
      expect(Purchases.getPurchaserInfo).not.toHaveBeenCalled();
      expect(Purchases.restoreTransactions).toHaveBeenCalled();
      expect(result.current).toBeTruthy();
    });
  });

  it("handles errors", async () => {
    const error = { code: 1337, message: "foobar" };
    (AsyncStorage.getItem as jest.Mock).mockReturnValue("true");
    (Purchases.getPurchaserInfo as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useGetAdFreeStatus());

    await waitFor(() => {
      expect(Native.captureException).toHaveBeenCalledWith(error, {
        extra: { error },
      });
      expect(result.current).toBeFalsy();
    });
  });
});
