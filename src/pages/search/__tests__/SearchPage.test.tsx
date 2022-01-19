jest.mock("hooks/useSearch");

import { Entry } from "hooks/useGetEntry";
import useSearch from "hooks/useSearch";
import React from "react";
import "react-native";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import { fireEvent, render } from "utils/testUtils";
import SearchPage from "../SearchPage";

const props = {
  route: {
    params: {
      query: "query",
    },
  },
  navigation: {
    replace: jest.fn(),
    goBack: jest.fn(),
  },
};

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

const { replace, goBack } = props.navigation;

describe("SearchPage", () => {
  it("redirects to display if only one result", () => {
    (useSearch as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        search: {
          results: searchResults.slice(0, 1),
        },
      },
    });

    render(<SearchPage {...(props as any)} />);

    expect(replace).toHaveBeenCalledWith("Display", {
      entryId: searchResults[0].id,
      noAnimate: true,
    });
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

    const result = render(<SearchPage {...(props as any)} />);

    expect(result.getByText("term 1")).toBeTruthy();
    expect(result.getByText("term 2")).toBeTruthy();
    expect(result.getByText("term 3")).toBeTruthy();
  });

  it("shows a modal if no results", () => {
    (useSearch as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        search: {
          results: [],
        },
      },
    });

    const result = render(<SearchPage {...(props as any)} />);

    fireEvent.press(result.getByText("OK"));

    expect(goBack).toHaveBeenCalled();
  });

  it("shows conjugator option if query is in dictionary form", () => {
    (useSearch as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        search: {
          results: [],
        },
      },
    });

    const newProps = props;
    newProps.route.params.query = "있다";
    const result = render(<SearchPage {...(newProps as any)} />);

    fireEvent.press(result.getByText("Use Conjugator"));

    expect(replace).toHaveBeenCalledWith("Conjugator", {
      term: newProps.route.params.query,
    });
  });

  it("logs search events", () => {
    (useSearch as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        search: {
          results: searchResults,
        },
      },
    });

    render(<SearchPage {...(props as any)} />);

    expect(logEvent).toHaveBeenCalledWith({
      type: LOG_EVENT.SEARCH,
      params: { search_term: props.route.params.query },
    });
  });
});
