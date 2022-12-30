import { useNavigation } from "@react-navigation/native";
import React from "react";
import "react-native";
import { NavigationProps } from "typings/navigation";
import { ConjugationName, Formality, Tense } from "utils/conjugationTypes";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import { fireEvent, render, waitFor } from "utils/testUtils";
import ConjugationCard from "../ConjugationCard";

const baseConjugation = {
  type: "type",
  tense: Tense.PRESENT,
  honorific: false,
  pronunciation: "pronunciation",
  romanization: "romanization",
  reasons: [],
};

const props = {
  title: "Conjugations",
  conjugations: [
    {
      name: "name 1" as ConjugationName,
      conjugation: "conj 1",
      speechLevel: Formality.INFORMAL_LOW,
      ...baseConjugation,
    },
    {
      name: "name 2" as ConjugationName,
      conjugation: "conj 2",
      speechLevel: Formality.INFORMAL_HIGH,
      ...baseConjugation,
    },
    {
      name: "name 3" as ConjugationName,
      conjugation: "conj 3",
      speechLevel: Formality.FORMAL_LOW,
      ...baseConjugation,
    },
  ],
};

const { push } = useNavigation<NavigationProps>();

describe("ConjugationCard", () => {
  it("displays conjugations", () => {
    const component = render(<ConjugationCard {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("redirects to ConjInfo Page", async () => {
    const component = render(<ConjugationCard {...props} />);

    fireEvent.press(component.getByText(Formality.INFORMAL_LOW));

    const { name, conjugation, honorific } = props.conjugations[0];
    await waitFor(() => {
      expect(logEvent).toHaveBeenCalledWith({
        type: LOG_EVENT.SELECT_CONJUGATION,
        params: { name, conjugation, honorific },
      });
      expect(push).toHaveBeenCalledWith("ConjInfo", {
        conjugation: props.conjugations[0],
      });
    });
  });
});
