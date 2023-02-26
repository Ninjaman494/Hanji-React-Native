import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook } from "@testing-library/react-native";
import useUserContext from "hooks/useUserContext";
import { getPageView, useLogPageView } from "logging/pageView";
import { PageName } from "typings/navigation";

jest.mock("@react-native-async-storage/async-storage");

(AsyncStorage.getItem as jest.Mock).mockResolvedValue("42");

const KEY = `${PageName.MAIN}_VISIT_COUNT`;
describe("pageView", () => {
  it("fetches the number of page views for a given page", async () => {
    const pageView = await getPageView(PageName.MAIN);

    expect(pageView).toEqual(42);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(KEY);
  });

  it("sets the number of page views for a given page", async () => {
    const { result } = renderHook(() => useLogPageView());
    const { result: contextResult } = renderHook(() => useUserContext());

    await result.current(PageName.MAIN);

    expect(contextResult.current.updateStore).toHaveBeenCalled();
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(KEY, "43");
  });
});
