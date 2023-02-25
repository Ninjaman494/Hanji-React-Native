import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook } from "@testing-library/react-native";
import useUserContext from "hooks/useUserContext";
import {
  hasHonorificToggled,
  useLogHonorificToggled,
} from "logging/honorificToggled";
import { HONORIFIC_TOGGLED_KEY } from "utils/asyncStorageHelper";

jest.mock("@react-native-async-storage/async-storage");

(AsyncStorage.getItem as jest.Mock).mockResolvedValue("true");

describe("honorificToggled", () => {
  it("fetches honorific toggle status", async () => {
    const isToggled = await hasHonorificToggled();

    expect(isToggled).toBe(true);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(HONORIFIC_TOGGLED_KEY);
  });

  it("can set honorific toggle status", async () => {
    const { result } = renderHook(() => useLogHonorificToggled());
    const { result: contextResult } = renderHook(() => useUserContext());

    await result.current(true);

    expect(contextResult.current.updateStore).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      HONORIFIC_TOGGLED_KEY,
      "true"
    );
  });
});
