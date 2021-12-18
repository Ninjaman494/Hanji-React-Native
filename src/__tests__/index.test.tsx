jest.mock("sentry-expo");
jest.mock("setupSentry");
jest.mock("setupMessaging");
jest.mock("setupPurchases");
jest.mock("hooks/useGetFavorites");
jest.mock("hooks/useSetFavorites");
jest.mock("Pages", () => ({
  __esModule: true,
  default: () => <div>Pages</div>,
}));

import { render } from "@testing-library/react-native";
import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import Index from "index";
import { DEFAULT_FAVORITES } from "pages/main/MainPage";
import React from "react";
import "react-native";
import { Native } from "sentry-expo";
import setupMessaging from "setupMessaging";
import setupPurchases from "setupPurchases";
import setupSentry from "setupSentry";

const setFavorites = jest.fn();
(useSetFavorites as jest.Mock).mockReturnValue({ setFavorites });

describe("Index", () => {
  beforeEach(() => {
    (useGetFavorites as jest.Mock).mockReturnValue({
      loading: false,
      favorites: DEFAULT_FAVORITES,
    });
  });

  it("creates favorites if none exist", async () => {
    (useGetFavorites as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      favorites: null,
    });

    render(<Index />);

    expect(setFavorites).toHaveBeenCalledWith(DEFAULT_FAVORITES);
  });

  it("doesn't create favorites if they already exist", async () => {
    render(<Index />);

    expect(useGetFavorites).toHaveBeenCalled();
    expect(setFavorites).not.toHaveBeenCalled();
  });

  it("initializes Sentry", () => {
    render(<Index />);

    expect(setupSentry).toHaveBeenCalled();
    expect(Native.setContext).toHaveBeenCalledWith("Favorites", {
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
});
