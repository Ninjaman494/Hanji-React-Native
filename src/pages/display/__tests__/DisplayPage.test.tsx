jest.mock("hooks/useGetEntry");
jest.mock("hooks/useGetFavorites");
jest.mock("hooks/useConjugations");
jest.mock("logging/notificationsPermission");

import notifee from "@notifee/react-native";
import useConjugations from "hooks/useConjugations";
import useGetEntry from "hooks/useGetEntry";
import useGetFavorites from "hooks/useGetFavorites";
import {
  hasAskedNotificationPermission,
  setAskedNotificationPermission,
} from "logging/notificationsPermission";
import DisplayPage from "pages/display/DisplayPage";
import React from "react";
import "react-native";
import { Formality, Tense } from "utils/conjugationTypes";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import { fireEvent, render, waitFor } from "utils/testUtils";

const favConjugations = [
  {
    name: "declarative past informal high",
    honorific: false,
  },
  {
    name: "declarative present informal high",
    honorific: false,
  },
  {
    name: "declarative future informal high",
    honorific: false,
  },
];

const entry = {
  id: "id",
  term: "term",
  pos: "Verb",
  definitions: ["def 1", "def 2", "def 3"],
};

const conjBase = {
  conjugation: "conjugation",
  type: "type",
  tense: Tense.PRESENT,
  speechLevel: Formality.INFORMAL_HIGH,
  honorific: false,
  pronunciation: "pronunciation",
  romanization: "romanization",
  reasons: [],
};

(useGetFavorites as jest.Mock).mockReturnValue({
  loading: false,
  favorites: favConjugations.map(({ name, honorific }, i) => ({
    name: `Favorite ${i + 1}`,
    conjugationName: name,
    honorific,
  })),
});

(useConjugations as jest.Mock).mockReturnValue({
  loading: false,
  data: {
    getConjugations: [
      { name: "declarative past informal high", ...conjBase },
      { name: "declarative present informal high", ...conjBase },
      { name: "declarative future informal high", ...conjBase },
    ],
  },
});

const props = {
  navigation: { push: jest.fn() },
  route: {
    params: { entryId: "id" },
  },
};

describe("DisplayPage", () => {
  it("hides cards correctly", async () => {
    (useGetEntry as jest.Mock).mockReturnValue({
      loading: false,
      data: { entry: { ...entry, pos: "Noun" } },
    });

    const result = render(<DisplayPage {...(props as any)} />);

    await waitFor(() => {
      expect(result.getByText(entry.term)).toBeTruthy();
      expect(result.queryByText("Note")).toBeFalsy();
      expect(result.queryByText("Conjugations")).toBeFalsy();
      expect(result.queryByText("Examples")).toBeFalsy();
      expect(result.queryByText("Synonyms")).toBeFalsy();
      expect(result.queryByText("Antonyms")).toBeFalsy();
    });

    expect(useConjugations).toHaveBeenCalledWith(
      {
        input: {
          stem: entry.term,
          isAdj: false,
          conjugations: favConjugations,
        },
      },
      { skip: true }
    );
  });

  it("shows cards correctly", async () => {
    (useGetEntry as jest.Mock).mockReturnValue({
      loading: false,
      data: {
        entry: {
          ...entry,
          note: "This is a note",
          synonyms: ["synonym"],
          antonyms: ["antonym"],
          examples: [
            {
              sentence: "sentence",
              translation: "translation",
            },
          ],
        },
      },
    });

    const result = render(<DisplayPage {...(props as any)} />);

    await waitFor(() => {
      expect(result.getByText(entry.term)).toBeTruthy();
      expect(result.queryByText("Note")).toBeTruthy();
      expect(result.queryByText("Conjugations")).toBeTruthy();
      expect(result.queryByText("Examples")).toBeTruthy();
      expect(result.queryByText("Synonyms")).toBeTruthy();
      expect(result.queryByText("Antonyms")).toBeTruthy();
    });

    expect(useConjugations).toHaveBeenCalledWith(
      {
        input: {
          stem: entry.term,
          isAdj: false,
          conjugations: favConjugations,
        },
      },
      { skip: false }
    );

    fireEvent.press(result.getByText("See all"));
    await waitFor(() =>
      expect(props.navigation.push).toHaveBeenCalledWith("Conjugations", {
        stem: entry.term,
        isAdj: false,
        honorific: false,
      })
    );
  });

  it("logs select content events", () => {
    (useGetEntry as jest.Mock).mockReturnValue({
      loading: false,
      data: { entry },
    });

    render(<DisplayPage {...(props as any)} />);

    expect(logEvent).toHaveBeenCalledWith({
      type: LOG_EVENT.SELECT_CONTENT,
      params: { item_id: entry.term, content_type: entry.pos },
    });
  });

  it("asks for notifications permissions after a delay", async () => {
    (useGetEntry as jest.Mock).mockReturnValue({
      loading: false,
      data: { entry },
    });
    (hasAskedNotificationPermission as jest.Mock).mockResolvedValue(false);

    render(<DisplayPage {...(props as any)} />);

    await new Promise((r) => setTimeout(r, 600));

    expect(notifee.requestPermission).toHaveBeenCalled();
    expect(setAskedNotificationPermission).toHaveBeenCalledWith(true);
  });
});
