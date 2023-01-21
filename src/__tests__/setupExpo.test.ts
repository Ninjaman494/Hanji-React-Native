jest.mock("react-native-exception-handler");
jest.mock("sentry-expo");

import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import { init } from "sentry-expo";
import setupSentry from "setupSentry";

describe("setupExpo", () => {
  it("initializes Sentry", () => {
    setupSentry();

    expect(init).toHaveBeenCalled();
  });

  it("sets global error handlers", () => {
    setupSentry();

    expect(setJSExceptionHandler).toHaveBeenCalled();
    expect(setNativeExceptionHandler).toHaveBeenCalled();
  });
});
