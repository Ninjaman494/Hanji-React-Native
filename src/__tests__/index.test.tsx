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
import { useLocation } from "react-router";

jest.useFakeTimers();

(useLocation as jest.Mock).mockReturnValue({
  pathname: "path",
});

const setFavorites = jest.fn();
(useSetFavorites as jest.Mock).mockReturnValue({ setFavorites });

describe("Index", () => {
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
    (useGetFavorites as jest.Mock).mockReturnValue({
      loading: false,
      favorites: DEFAULT_FAVORITES,
    });
    setFavorites.mockClear();

    render(<Index />);

    expect(useGetFavorites).toHaveBeenCalled();
    expect(setFavorites).not.toHaveBeenCalled();
  });
});
