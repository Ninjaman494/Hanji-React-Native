jest.mock("@sentry/react-native");
jest.mock("expo-store-review");
jest.mock("react-native-purchases");
jest.mock("setupSentry");
jest.mock("setupMessaging", () => jest.fn());
jest.mock("setupPurchases");
jest.mock("utils/setupAds");
jest.mock("hooks/useGetFavorites");
jest.mock("hooks/useSetFavorites");
jest.mock("hooks/useCheckNetInfo");
jest.mock("Pages", () => ({
  __esModule: true,
  default: () => <div>Pages</div>,
}));
jest.mock("@react-native-firebase/analytics", () => {
  return () => ({
    setAnalyticsCollectionEnabled: jest.fn(),
    setUserId: jest.fn(),
  });
});

import { setContext } from "@sentry/react-native";
import { render } from "@testing-library/react-native";
import useCheckNetInfo from "hooks/useCheckNetInfo";
import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import Index from "index";
import { DEFAULT_FAVORITES } from "pages/main/MainPage";
import React from "react";
import "react-native";
import setupMessaging from "setupMessaging";
import setupPurchases from "setupPurchases";
import setupSentry from "setupSentry";
import setupAds from "utils/setupAds";

jest.useFakeTimers();

const setFavorites = jest.fn();
(useSetFavorites as jest.Mock).mockReturnValue({ setFavorites });

(useCheckNetInfo as jest.Mock).mockReturnValue({ isInternetReachable: true });

describe("Index", () => {
  beforeEach(() => {
    (useGetFavorites as jest.Mock).mockReturnValue({
      loading: false,
      favorites: DEFAULT_FAVORITES,
    });
  });

  it("creates favorites if none exist", () => {
    (useGetFavorites as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      favorites: null,
    });

    render(<Index />);

    expect(setFavorites).toHaveBeenCalledWith(DEFAULT_FAVORITES);
  });

  it("doesn't create favorites if they already exist", () => {
    render(<Index />);

    expect(useGetFavorites).toHaveBeenCalled();
    expect(setFavorites).not.toHaveBeenCalled();
  });

  it("initializes Sentry", () => {
    render(<Index />);

    expect(setupSentry).toHaveBeenCalled();
    expect(setContext).toHaveBeenCalledWith("Favorites", {
      favorites: DEFAULT_FAVORITES,
    });
  });

  it("initializes Purchases", () => {
    render(<Index />);

    expect(setupPurchases).toHaveBeenCalled();
  });

  it("initializes Cloud Messaging", () => {
    render(<Index />);

    expect(setupMessaging).toHaveBeenCalled();
  });

  it("initializes Appodeal", () => {
    render(<Index />);

    expect(setupAds).toHaveBeenCalled();
  });

  it("skips third-party initialization if internet is down", () => {
    (useCheckNetInfo as jest.Mock).mockReturnValueOnce({
      isInternetReachable: false,
    });

    render(<Index />);

    expect(setupSentry).not.toHaveBeenCalled();
    expect(setupPurchases).not.toHaveBeenCalled();
    expect(setupMessaging).not.toHaveBeenCalled();
    expect(setupAds).not.toHaveBeenCalled();
  });
});
