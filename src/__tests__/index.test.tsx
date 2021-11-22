jest.mock("sentry-expo");
jest.mock("react-native-exception-handler");
jest.mock("hooks/useGetFavorites");
jest.mock("hooks/useSetFavorites");

import { render, waitFor } from "@testing-library/react-native";
import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import Index from "index";
import { DEFAULT_FAVORITES } from "pages/main/MainPage";
import React from "react";
import "react-native";
import { setNativeExceptionHandler } from "react-native-exception-handler";
import { init, Native } from "sentry-expo";

jest.useFakeTimers();

const pathname = "path";

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
    setFavorites.mockClear();

    render(<Index />);

    expect(useGetFavorites).toHaveBeenCalled();
    expect(setFavorites).not.toHaveBeenCalled();
  });

  it("initializes Sentry", async () => {
    render(<Index />);

    expect(init).toHaveBeenCalled();
    expect(Native.setContext).toHaveBeenCalledWith("Favorites", {
      favorites: DEFAULT_FAVORITES,
    });
    expect(Native.addBreadcrumb).toHaveBeenCalledWith({
      category: "navigation",
      message: `Route changed to ${pathname}`,
      level: Native.Severity.Info,
      data: { pathname },
    });
  });

  it("sets global error handlers", async () => {
    render(<Index />);

    await waitFor(() => {
      // expect(setJSExceptionHandler).toHaveBeenCalled();
      expect(setNativeExceptionHandler).toHaveBeenCalled();
    });
  });
});
