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

(useLazySearch as jest.Mock).mockReturnValue([
  jest.fn(),
  { data: null, loading: false },
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

  it("fetches more results when the user scrolls to the bottom", async () => {
    const initialData = {
      search: {
        results: searchResults,
        cursor: searchResults.length,
      },
    };
    (useSearch as jest.Mock).mockReturnValue({
      data: initialData,
      loading: false,
    });

    const search = jest.fn();
    (useLazySearch as jest.Mock).mockReturnValueOnce([
      search,
      { data: undefined, loading: false },
    ]);

    const result = render(<SearchPage {...(props as any)} />);

    expect(result.getByText(searchResults[0].term)).toBeTruthy();
    expect(result.getByText(searchResults[1].term)).toBeTruthy();
    expect(result.getByText(searchResults[2].term)).toBeTruthy();

    const extraResults = searchResults.map(({ id, ...rest }) => {
      const newId = (parseInt(id) + searchResults.length).toString();
      return {
        ...rest,
        id: newId,
        term: `term ${newId}`,
      };
    });
    (useLazySearch as jest.Mock).mockReturnValueOnce([
      search,
      {
        data: {
          search: {
            results: extraResults,
            cursor: searchResults.length + extraResults.length,
          },
        },
        loading: false,
      },
    ]);

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
          x: 0,
        },
        contentSize: {
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          height: 100,
          width: 100,
        },
      },
    };
    fireEvent.scroll(result.getByText(searchResults[2].term), eventData);

    expect(search).toHaveBeenCalledWith({
      variables: {
        query: props.route.params.query,
        cursor: initialData.search.cursor + 1,
      },
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
