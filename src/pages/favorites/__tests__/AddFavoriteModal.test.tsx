jest.mock("hooks/useSetFavorites");
jest.mock("hooks/useGetFavorites");

import { Favorite } from "hooks/useGetFavorites";
import useSetFavorites from "hooks/useSetFavorites";
import React from "react";
import "react-native";
import { ConjugationType, Formality } from "utils/conjugationTypes";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import { fireEvent, render, waitFor } from "utils/testUtils";
import AddFavoriteModal from "../AddFavoriteModal";

const setFavorites = jest.fn();
(useSetFavorites as jest.Mock).mockReturnValue({ setFavorites });

const favorites = [
  {
    name: "Past",
    conjugationName: `${ConjugationType.DECLARATIVE_PAST} ${Formality.INFORMAL_HIGH}`,
    honorific: false,
  },
  {
    name: "Present",
    conjugationName: `${ConjugationType.DECLARATIVE_PRESENT} ${Formality.INFORMAL_HIGH}`,
    honorific: false,
  },
  {
    name: "Future",
    conjugationName: `${ConjugationType.DECLARATIVE_FUTURE} ${Formality.INFORMAL_HIGH}`,
    honorific: false,
  },
];

const props = {
  visible: true,
  favorites: favorites as Favorite[],
  onDismiss: jest.fn(),
  onSubmit: jest.fn(),
};

describe("AddFavoritesModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adds favorite", async () => {
    const component = render(<AddFavoriteModal {...props} />);

    fireEvent.changeText(component.getByLabelText("Name"), "name");

    // Select conjugation
    fireEvent.press(component.getByLabelText("Conjugation"));
    await waitFor(() => {
      expect(component.getByText("Interrogative Present")).toBeDefined();
    });
    fireEvent.press(component.getByText("Interrogative Present"));

    // Validate formality required
    expect(component.getByText("Submit")).toBeDisabled();

    // Select formality
    fireEvent.press(component.getByLabelText("Formality"));
    await waitFor(() => {
      expect(component.getByText("Informal High")).toBeDefined();
    });
    fireEvent.press(component.getByText("Informal High"));

    // Toggle honorific
    fireEvent(component.getByLabelText("Honorific"), "onValueChange", true);

    // Submit favorite
    await waitFor(() => expect(component.getByText("Submit")).toBeEnabled());
    fireEvent.press(component.getByText("Submit"));

    const favorite = {
      name: "name",
      conjugationName: `${ConjugationType.INTERROGATIVE_PRESENT} ${Formality.INFORMAL_HIGH}`,
      honorific: true,
    };
    await waitFor(() => {
      expect(props.onSubmit).toHaveBeenCalled();
      expect(setFavorites).toHaveBeenCalledWith([...favorites, favorite]);
      expect(logEvent).toHaveBeenCalledWith({
        type: LOG_EVENT.ADD_FAVORITE,
        params: {
          name: favorite.name,
          conjugation_name: favorite.conjugationName,
          honorific: favorite.honorific,
        },
      });
    });
  });

  it.each(["Determiner Future", "Connective If", "Nominal Ing"])(
    "hides formality field for %s",
    async (conjugation) => {
      const component = render(<AddFavoriteModal {...props} />);

      fireEvent.changeText(component.getByLabelText("Name"), "name");

      // Select conjugation
      fireEvent.press(component.getByLabelText("Conjugation"));
      await waitFor(() => {
        expect(component.getByText(conjugation)).toBeDefined();
      });
      fireEvent.press(component.getByText(conjugation));

      // Validate Formality field is hidden
      expect(component.queryByLabelText("Formality")).toBeNull();

      // Submit without required formality
      await waitFor(() => expect(component.getByText("Submit")).toBeEnabled());
      fireEvent.press(component.getByText("Submit"));

      await waitFor(() => {
        expect(props.onSubmit).toHaveBeenCalled();
        expect(setFavorites).toHaveBeenCalledWith([
          ...favorites,
          {
            name: "name",
            conjugationName: conjugation.toLowerCase(),
            honorific: false,
          },
        ]);
      });
    }
  );
});
