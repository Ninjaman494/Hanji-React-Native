jest.mock("hooks/useSearch");
jest.mock("hooks/useLazySearch");

import { Entry } from "hooks/useGetEntry";
import useLazySearch from "hooks/useLazySearch";
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
    alwaysHonorific: false,
  },
  {
    id: "2",
    term: "term 2",
    pos: "verb",
    definitions: ["def 1", "def 2"],
    synonyms: ["synonym"],
    alwaysHonorific: false,
  },
  {
    id: "3",
    term: "term 3",
    pos: "verb",
    definitions: ["def 1", "def 2"],
    examples: [{ sentence: "sentence", translation: "translation" }],
    alwaysHonorific: false,
  },
];

const { replace, goBack } = props.navigation;

jest.useFakeTimers();

const search = jest.fn();
(useLazySearch as jest.Mock).mockReturnValue([
  search,
  { data: undefined, loading: false },
]);

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

    expect(result.queryByText("Showing results")).toBeFalsy();
    expect(result.getByText("term 1")).toBeTruthy();
    expect(result.getByText("term 2")).toBeTruthy();
    expect(result.getByText("term 3")).toBeTruthy();
  });

  describe("when user scrolls to the bottom", () => {
    describe("when there's more data to load", () => {
      beforeEach(() => {
        (useSearch as jest.Mock).mockReturnValue({
          data: {
            search: {
              results: searchResults,
              cursor: searchResults.length,
            },
          },
          loading: false,
        });
      });

      it("shows loading indicator", () => {
        // Override top-level mock
        (useLazySearch as jest.Mock).mockReturnValue([
          search,
          { data: undefined, loading: true },
        ]);

        const result = render(<SearchPage {...(props as any)} />);
        fireEvent(result.getByTestId("searchList"), "onEndReached");

        expect(result.getByAccessibilityHint("loading")).toBeTruthy();
      });

      it("loads data", async () => {
        const result = render(<SearchPage {...(props as any)} />);
        fireEvent(result.getByTestId("searchList"), "onEndReached");

        expect(search).toHaveBeenCalledWith({
          variables: {
            query: props.route.params.query,
            cursor: searchResults.length,
          },
        });
      });
    });

    it("does not fetch more data if not avaliable", () => {
      (useSearch as jest.Mock).mockReturnValue({
        data: {
          search: {
            results: searchResults,
            cursor: -1,
          },
        },
        loading: false,
      });

      const result = render(<SearchPage {...(props as any)} />);
      fireEvent(result.getByTestId("searchList"), "onEndReached");

      expect(search).not.toHaveBeenCalled();
    });
  });

  it("shows autocorrect notification", () => {
    (useSearch as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        search: {
          results: searchResults,
          autocorrected: "autocorrect suggestion",
        },
      },
    });

    const result = render(<SearchPage {...(props as any)} />);

    expect(
      result.getByText("Showing results for autocorrect suggestion")
    ).toBeTruthy();
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
