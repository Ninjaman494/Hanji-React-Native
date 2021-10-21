jest.mock("sentry-expo");
jest.mock("react-native-exception-handler");
jest.mock("react-router");
jest.mock("hooks/useGetFavorites");
jest.mock("hooks/useSetFavorites");

import { render } from "@testing-library/react-native";
import useGetFavorites from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import Index from "index";
import { DEFAULT_FAVORITES } from "pages/main/MainPage";
import React from "react";
import "react-native";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import { useLocation } from "react-router";
import { init, Native } from "sentry-expo";

jest.useFakeTimers();

const pathname = "path";
(useLocation as jest.Mock).mockReturnValue({ pathname });

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

  it("sets global error handlers", () => {
    render(<Index />);

    expect(setJSExceptionHandler).toHaveBeenCalled();
    expect(setNativeExceptionHandler).toHaveBeenCalled();
  });
});
