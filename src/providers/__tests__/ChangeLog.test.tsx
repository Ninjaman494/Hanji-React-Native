jest.mock("@react-native-async-storage/async-storage");

import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangeLog from "providers/ChangeLog";
import React from "react";
import { render, waitFor } from "utils/testUtils";
import changelogJSON from "../change-log.json";

describe("ChangeLog component", () => {
  it("shows changelog when updated to a new version", async () => {
    (AsyncStorage.getItem as jest.Mock).mockReturnValue("32");

    const result = render(<ChangeLog currentVersion="33" />);

    const { name, date, features } = changelogJSON[33];
    await waitFor(() => {
      expect(result.getByText("What's New")).toBeTruthy();
      expect(result.getByText(name)).toBeTruthy();
      expect(result.getByText(`(${date})`)).toBeTruthy();
      features.forEach((f) =>
        expect(result.getByText(`\u2022 ${f}`)).toBeTruthy()
      );
    });
  });

  it("doesn't show changelog if not updated", async () => {
    (AsyncStorage.getItem as jest.Mock).mockReturnValue("32");

    const result = render(<ChangeLog currentVersion="32" />);

    await waitFor(() => expect(result.queryByText("What's New")).toBeNull());
  });

  it("doesn't show changelog on fresh install", async () => {
    (AsyncStorage.getItem as jest.Mock).mockReturnValue(null);

    const result = render(<ChangeLog currentVersion="32" />);

    await waitFor(() => expect(result.queryByText("What's New")).toBeNull());
  });
});
