jest.mock("hooks/useGetWOD");

import useGetWOD from "hooks/useGetWOD";
import React from "react";
import "react-native";
import { fireEvent, render } from "utils/testUtils";
import WODCard from "../WODCard";

const onSeeEntry = jest.fn();

describe("WODCard component", () => {
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
    const result = render(<WODCard onSeeEntry={onSeeEntry} />);

    expect(result.getByText("foo")).toBeTruthy();

    fireEvent.press(result.getByText("See entry"));

    expect(onSeeEntry).toHaveBeenCalledWith("abc1");
  });

  it("handles loading state", () => {
    (useGetWOD as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
    });
    const result = render(<WODCard onSeeEntry={onSeeEntry} />);

    expect(result.getByText("Loading...")).toBeTruthy();

    fireEvent.press(result.getByText("See entry"));

    expect(onSeeEntry).not.toHaveBeenCalled();
  });

  it("handles error state", () => {
    (useGetWOD as jest.Mock).mockReturnValue({
      loading: false,
      error: true,
      data: null,
    });
    const result = render(<WODCard onSeeEntry={onSeeEntry} />);

    expect(result.getByText("Could not fetch Word of the Day")).toBeTruthy();

    fireEvent.press(result.getByText("See entry"));

    expect(onSeeEntry).not.toHaveBeenCalled();
  });
});
