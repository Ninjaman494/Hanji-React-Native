jest.mock("hooks/useConjugations");
jest.mock("react-router-native");

import useConjugations from "hooks/useConjugations";
import React from "react";
import "react-native";
import { useLocation } from "react-router-native";
import { Formality, Tense } from "utils/conjugationTypes";
import { fireEvent, render, waitFor } from "utils/testUtils";
import ConjugationsPage from "../ConjugationsPage";

const hookOptions = {
  notifyOnNetworkStatusChange: true,
  fetchPolicy: "cache-and-network",
};

const conjugation = {
  name: "declarative present informal high",
  conjugation: "conj 1",
  type: "declarative present",
  tense: Tense.PRESENT,
  speechLevel: Formality.INFORMAL_LOW,
  honorific: false,
  pronunciation: "pronunciation",
  romanization: "romanization",
  reasons: [],
};
const conjugations = [conjugation, conjugation, conjugation];

(useConjugations as jest.Mock).mockReturnValue({
  loading: false,
  data: { conjugations },
});

(useLocation as jest.Mock).mockReturnValue({
  search: "stem=stem&isAdj=true",
});

describe("ConjugationsPage", () => {
  it("fetches conjugations", async () => {
    render(<ConjugationsPage />);

    await waitFor(() => {
      expect(useConjugations).toHaveBeenCalledWith(
        {
          stem: "stem",
          isAdj: true,
          honorific: false,
        },
        hookOptions
      );
    });
  });

  it("refetches on honorific toggle", async () => {
    const result = render(<ConjugationsPage />);

    fireEvent(result.getByRole("switch"), "valueChange", true);

    await waitFor(() => {
      expect(useConjugations).toHaveBeenCalledWith(
        {
          stem: "stem",
          isAdj: true,
          honorific: true,
        },
        hookOptions
      );
    });
  });
});
