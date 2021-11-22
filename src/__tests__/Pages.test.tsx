jest.mock("sentry-expo");
jest.mock("react-native-gesture-handler");

import Pages from "Pages";
import React from "react";
import "react-native";
import "react-native-gesture-handler/jestSetup";
import { Native } from "sentry-expo";
import { render } from "utils/testUtils";

jest.useFakeTimers();

describe("Pages component", () => {
  it("sets navigation breadcrumbs", async () => {
    render(<Pages />);

    expect(Native.addBreadcrumb).toHaveBeenCalledWith({
      category: "navigation",
      message: "Route changed to MainPage",
      level: Native.Severity.Info,
      data: { foo: "bar" },
    });
  });
});
