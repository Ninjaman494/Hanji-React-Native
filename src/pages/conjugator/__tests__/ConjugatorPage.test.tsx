jest.mock("hooks/useGetStems");
jest.mock("hooks/useConjugations");

import useConjugations from "hooks/useConjugations";
import useGetStems from "hooks/useGetStems";
import React from "react";
import "react-native";
import { ConjugationName, Formality, Tense } from "utils/conjugationTypes";
import { fireEvent, render, waitFor } from "utils/testUtils";
import ConjugatorPage from "../ConjugatorPage";

jest.useFakeTimers();

const conjugation = {
  name: "name 1" as ConjugationName,
  conjugation: "conj 1",
  type: "declarative present",
  tense: Tense.PRESENT,
  speechLevel: Formality.INFORMAL_LOW,
  honorific: false,
  pronunciation: "pronunciation",
  romanization: "romanization",
  reasons: [],
};

const hookOptions = {
  skip: false,
  notifyOnNetworkStatusChange: true,
  fetchPolicy: "cache-and-network",
};

(useGetStems as jest.Mock).mockReturnValue({
  loading: false,
  data: { stems: ["stem 1", "stem 2", "stem 3"] },
});

(useConjugations as jest.Mock).mockReturnValue({
  loading: false,
  data: { getConjugations: [conjugation, conjugation, conjugation] },
});

const props = {
  navigation: { goBack: jest.fn() },
  route: {
    params: { term: "term" },
  },
};

describe("Conjugator Page", () => {
  it("fetches conjugations", async () => {
    render(<ConjugatorPage {...(props as any)} />);

    await waitFor(() => {
      expect(useGetStems).toHaveBeenCalled();
      expect(useConjugations).toHaveBeenCalledWith(
        {
          input: {
            stem: "stem 1",
            isAdj: false,
            regular: true,
            honorific: false,
          },
        },
        hookOptions
      );
    });
  });

  it("refetches on form change", async () => {
    const result = render(<ConjugatorPage {...(props as any)} />);

    // Select second stem
    fireEvent.press(result.getByLabelText("Possible Stems"));
    await waitFor(() => {
      expect(result.getByText("stem 2")).toBeDefined();
    });
    fireEvent.press(result.getByText("stem 2"));
    await waitFor(() => {
      expect(useConjugations).toHaveBeenCalledWith(
        {
          input: {
            stem: "stem 2",
            isAdj: false,
            regular: true,
            honorific: false,
          },
        },
        hookOptions
      );
    });

    // Select adjective
    fireEvent.press(result.getByLabelText("Part of Speech"));
    await waitFor(() => {
      expect(result.getByText("Adjective")).toBeDefined();
    });
    fireEvent.press(result.getByText("Adjective"));
    await waitFor(() => {
      expect(useConjugations).toHaveBeenCalledWith(
        {
          input: {
            stem: "stem 2",
            isAdj: true,
            regular: true,
            honorific: false,
          },
        },
        hookOptions
      );
    });

    // Select irregular
    fireEvent.press(result.getByLabelText("Regularity"));
    await waitFor(() => {
      expect(result.getByText("Irregular Verb/Adjective")).toBeDefined();
    });
    fireEvent.press(result.getByText("Irregular Verb/Adjective"));
    await waitFor(() => {
      expect(useConjugations).toHaveBeenCalledWith(
        {
          input: {
            stem: "stem 2",
            isAdj: true,
            regular: false,
            honorific: false,
          },
        },
        hookOptions
      );
    });
  });

  it("refetches on honorific toggle", async () => {
    const result = render(<ConjugatorPage {...(props as any)} />);

    fireEvent(result.getByRole("switch"), "valueChange", true);

    await waitFor(() => {
      expect(useConjugations).toHaveBeenCalledWith(
        {
          input: {
            stem: "stem 1",
            isAdj: false,
            regular: true,
            honorific: true,
          },
        },
        hookOptions
      );
    });
  });
});
