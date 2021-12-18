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

    // Select formality
    fireEvent.press(component.getByLabelText("Formality"));
    await waitFor(() => {
      expect(component.getByText("Informal High")).toBeDefined();
    });
    fireEvent.press(component.getByText("Informal High"));

    // Toggle honorific
    fireEvent(component.getByLabelText("Honorific"), "onValueChange", true);

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

  it("hides formality field for determiners", async () => {
    const component = render(<AddFavoriteModal {...props} />);

    fireEvent.changeText(component.getByLabelText("Name"), "name");

    // Select conjugation
    fireEvent.press(component.getByLabelText("Conjugation"));
    await waitFor(() => {
      expect(component.getByText("Determiner Future")).toBeDefined();
    });
    fireEvent.press(component.getByText("Determiner Future"));

    expect(component.queryByLabelText("Formality")).toBeNull();

    fireEvent.press(component.getByText("Submit"));

    await waitFor(() => {
      expect(props.onSubmit).toHaveBeenCalled();
      expect(setFavorites).toHaveBeenCalledWith([
        ...favorites,
        {
          name: "name",
          conjugationName: `${ConjugationType.DETERMINER_FUTURE}`,
          honorific: false,
        },
      ]);
    });
  });

  it("hides formality field for connectives", async () => {
    const component = render(<AddFavoriteModal {...props} />);

    fireEvent.changeText(component.getByLabelText("Name"), "name");

    // Select conjugation
    fireEvent.press(component.getByLabelText("Conjugation"));
    await waitFor(() => {
      expect(component.getByText("Connective If")).toBeDefined();
    });
    fireEvent.press(component.getByText("Connective If"));

    expect(component.queryByLabelText("Formality")).toBeNull();

    fireEvent.press(component.getByText("Submit"));

    await waitFor(() => {
      expect(props.onSubmit).toHaveBeenCalled();
      expect(setFavorites).toHaveBeenCalledWith([
        ...favorites,
        {
          name: "name",
          conjugationName: `${ConjugationType.CONNECTIVE_IF}`,
          honorific: false,
        },
      ]);
    });
  });

  it("hides formality field for nominal ing", async () => {
    const component = render(<AddFavoriteModal {...props} />);

    fireEvent.changeText(component.getByLabelText("Name"), "name");

    // Select conjugation
    fireEvent.press(component.getByLabelText("Conjugation"));
    await waitFor(() => {
      expect(component.getByText("Nominal Ing")).toBeDefined();
    });
    fireEvent.press(component.getByText("Nominal Ing"));

    expect(component.queryByLabelText("Formality")).toBeNull();

    fireEvent.press(component.getByText("Submit"));

    await waitFor(() => {
      expect(props.onSubmit).toHaveBeenCalled();
      expect(setFavorites).toHaveBeenCalledWith([
        ...favorites,
        {
          name: "name",
          conjugationName: ConjugationType.NOMINAL_ING,
          honorific: false,
        },
      ]);
    });
  });
});
