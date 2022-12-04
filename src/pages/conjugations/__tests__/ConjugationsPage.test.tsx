jest.mock("hooks/useConjugations");

import useConjugations from "hooks/useConjugations";
import React from "react";
import "react-native";
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

(useConjugations as jest.Mock).mockReturnValue({
  loading: false,
  data: { getConjugations: [conjugation, conjugation, conjugation] },
});

const props = {
  navigation: { goBack: jest.fn() },
  route: {
    params: {
      stem: "stem",
      isAdj: true,
      honorific: false,
    },
  },
};

describe("ConjugationsPage", () => {
  it("fetches conjugations", async () => {
    render(<ConjugationsPage {...(props as any)} />);

    await waitFor(() => {
      expect(useConjugations).toHaveBeenCalledWith(
        {
          input: {
            stem: "stem",
            isAdj: true,
            honorific: false,
          },
        },
        hookOptions
      );
    });
  });

  it("refetches on honorific toggle", async () => {
    const result = render(<ConjugationsPage {...(props as any)} />);

    fireEvent(result.getByRole("switch"), "valueChange", true);

    await waitFor(() => {
      expect(useConjugations).toHaveBeenCalledWith(
        {
          input: {
            stem: "stem",
            isAdj: true,
            honorific: true,
          },
        },
        hookOptions
      );
    });
  });
});
