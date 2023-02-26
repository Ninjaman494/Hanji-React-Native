import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook } from "@testing-library/react-native";
import useUserContext from "hooks/useUserContext";
import { isPopupShown, useLogPopupShown } from "logging/popupShown";
import { PopupName } from "typings/popup";

jest.mock("@react-native-async-storage/async-storage");

(AsyncStorage.getItem as jest.Mock).mockResolvedValue("true");

const KEY = `${PopupName.CONJUGATIONS}_POPUP_SHOWN`;
describe("popupShown", () => {
  it("fetches popup status for a given popup", async () => {
    const isShown = await isPopupShown(PopupName.CONJUGATIONS);

    expect(isShown).toBe(true);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(KEY);
  });

  it("sets the number of page views for a given page", async () => {
    const { result } = renderHook(() => useLogPopupShown());
    const { result: contextResult } = renderHook(() => useUserContext());

    await result.current(PopupName.CONJUGATIONS, false);

    expect(contextResult.current.updateStore).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(KEY, "false");
  });
});
