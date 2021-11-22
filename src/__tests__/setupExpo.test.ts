jest.mock("react-native-exception-handler");
jest.mock("sentry-expo");

import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import { init } from "sentry-expo";
import setupExpo from "setupExpo";

describe("setupExpo", () => {
  it("initializes Sentry", () => {
    setupExpo();

    expect(init).toHaveBeenCalled();
  });

  it("sets global error handlers", () => {
    setupExpo();

    expect(setJSExceptionHandler).toHaveBeenCalled();
    expect(setNativeExceptionHandler).toHaveBeenCalled();
  });
});
