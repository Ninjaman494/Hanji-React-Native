jest.mock("react-router");
jest.mock("hooks/useSearch");

import { fireEvent, render } from "@testing-library/react-native";
import { Entry } from "hooks/useGetEntry";
import useSearch from "hooks/useSearch";
import React from "react";
import "react-native";
import { useHistory, useLocation } from "react-router";
import SearchPage from "../SearchPage";

const replace = jest.fn();
const goBack = jest.fn();
(useHistory as jest.Mock).mockReturnValue({
  replace,
  goBack,
});

(useLocation as jest.Mock).mockReturnValue({
  search: "query=query",
});

const searchResults: Entry[] = [
  {
    id: "1",
    term: "term 1",
    pos: "verb",
    definitions: ["def 1", "def 2"],
  },
  {
    id: "2",
    term: "term 2",
    pos: "verb",
    definitions: ["def 1", "def 2"],
    synonyms: ["synonym"],
  },
  {
    id: "3",
    term: "term 3",
    pos: "verb",
    definitions: ["def 1", "def 2"],
    examples: [{ sentence: "sentence", translation: "translation" }],
  },
];

describe("SearchPage", () => {
  it("redirects to display if only one result", async () => {
    (useSearch as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        search: {
          results: searchResults.slice(0, 1),
        },
      },
    });

    render(<SearchPage />);

    expect(replace).toHaveBeenCalledWith(`/display?id=${searchResults[0].id}`);
  });

  it("redirects to search results if multiple results", () => {
    (useSearch as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        search: {
          results: searchResults,
        },
      },
    });

    const result = render(<SearchPage />);

    expect(result.getByText("term 1")).toBeTruthy();
    expect(result.getByText("term 2")).toBeTruthy();
    expect(result.getByText("term 3")).toBeTruthy();
  });

  it("shows a modal if no results", async () => {
    (useSearch as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        search: {
          results: [],
        },
      },
    });

    const result = render(<SearchPage />);

    fireEvent.press(result.getByText("OK"));

    expect(goBack).toHaveBeenCalled();
  });
});
