jest.mock("react-router");
jest.mock("hooks/useGetWOD");

import useGetWOD from "hooks/useGetWOD";
import React from "react";
import "react-native";
import { useHistory } from "react-router";
import { fireEvent, render } from "utils/testUtils";
import WODCard from "../WODCard";

const pushHistory = jest.fn();
(useHistory as jest.Mock).mockReturnValue({
  push: pushHistory,
});

describe("WODCard component", () => {
  beforeEach(() => jest.clearAllMocks());

  it("shows Word of the Day", () => {
    (useGetWOD as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        wordOfTheDay: {
          id: "abc1",
          term: "foo",
        },
      },
    });
    const result = render(<WODCard />);

    expect(result.getByText("foo")).toBeTruthy();

    fireEvent.press(result.getByText("See entry"));

    expect(pushHistory).toHaveBeenCalledWith("/display?id=abc1");
  });

  it("handles loading state", () => {
    (useGetWOD as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
    });
    const result = render(<WODCard />);

    expect(result.getByText("Loading...")).toBeTruthy();

    fireEvent.press(result.getByText("See entry"));

    expect(pushHistory).not.toHaveBeenCalled();
  });

  it("handles error state", () => {
    (useGetWOD as jest.Mock).mockReturnValue({
      loading: false,
      error: true,
      data: null,
    });
    const result = render(<WODCard />);

    expect(result.getByText("Could not fetch Word of the Day")).toBeTruthy();

    fireEvent.press(result.getByText("See entry"));

    expect(pushHistory).not.toHaveBeenCalled();
  });
});
