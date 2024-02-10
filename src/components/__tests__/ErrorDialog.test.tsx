jest.mock("@sentry/react-native");

import { ApolloError } from "@apollo/client";
import { captureException } from "@sentry/react-native";
import React from "react";
import { render } from "utils/testUtils";
import ErrorDialog from "../ErrorDialog";

describe("ErrorDialog component", () => {
  it("reports errors to Sentry", () => {
    const error = new ApolloError({});
    const result = render(<ErrorDialog visible error={error} />);

    expect(captureException).toHaveBeenCalledWith(error, {
      extra: { error },
    });
    expect(
      result.queryByText(
        "An error occurred. Please try again later or contact support."
      )
    ).toBeTruthy();
  });

  it("doesn't report network errors to Sentry", () => {
    const error = new ApolloError({
      networkError: new Error("Network request failed"),
    });
    const result = render(<ErrorDialog visible error={error} />);

    expect(captureException).not.toHaveBeenCalled();
    expect(
      result.queryByText(
        "Network request failed. Please try again later or contact support."
      )
    ).toBeTruthy();
  });

  it("uses error message if present", () => {
    const error = new ApolloError({ errorMessage: "foobar" });
    const result = render(<ErrorDialog visible error={error} />);

    expect(captureException).toHaveBeenCalledWith(error, {
      extra: { error },
    });
    expect(
      result.queryByText("foobar. Please try again later or contact support.")
    ).toBeTruthy();
  });
});
