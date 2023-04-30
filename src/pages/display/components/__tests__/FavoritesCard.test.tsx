import { useNavigation } from "@react-navigation/native";
import { Conjugation } from "hooks/useConjugations";
import { Favorite } from "hooks/useGetFavorites";
import React from "react";
import "react-native";
import { NavigationProps } from "typings/navigation";
import {
  ConjugationName,
  ConjugationType,
  Formality,
  Tense,
} from "utils/conjugationTypes";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import { fireEvent, render, waitFor } from "utils/testUtils";
import FavoritesCard from "../../components/FavoritesCard";

const { push } = useNavigation<NavigationProps>();

const favorites: Favorite[] = [
  {
    name: "Favorite 1",
    conjugationName: "declarative past informal high",
    honorific: false,
  },
  {
    name: "Favorite 2",
    conjugationName: "declarative present informal high",
    honorific: false,
  },
  {
    name: "Favorite 3",
    conjugationName: "declarative future informal high",
    honorific: false,
  },
];

const baseConjugation = {
  type: "type",
  tense: Tense.PRESENT,
  speechLevel: Formality.INFORMAL_HIGH,
  honorific: false,
  pronunciation: "pronunciation",
  romanization: "romanization",
  reasons: [],
};

const props = {
  favorites: favorites,
  conjugations: [
    {
      name: "declarative past informal high" as ConjugationName,
      conjugation: "갔어요",
      ...baseConjugation,
    },
    {
      name: "declarative present informal high" as ConjugationName,
      conjugation: "가요",
      ...baseConjugation,
    },
    {
      name: "declarative future informal high" as ConjugationName,
      conjugation: "갈 거예요",
      ...baseConjugation,
    },
  ],
  alwaysHonorific: false,
  onPress: jest.fn(),
};

describe("FavoritesCard component", () => {
  it("displays favorites", () => {
    const component = render(<FavoritesCard {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("displays empty state", () => {
    const component = render(<FavoritesCard {...props} favorites={[]} />);
    expect(
      component.getByText(
        "You don't have any favorites. Click on favorites in settings to make some."
      )
    ).toBeTruthy();
  });

  it("triggers onClick", async () => {
    const component = render(<FavoritesCard {...props} />);

    fireEvent.press(component.getByText("See all"));

    await waitFor(() => expect(props.onPress).toHaveBeenCalled());
  });

  it("redirects to ConjInfo page", async () => {
    const component = render(<FavoritesCard {...props} />);

    fireEvent.press(component.getByText("Favorite 1"));

    const conjugation = props.conjugations[0];
    await waitFor(() => {
      expect(logEvent).toHaveBeenCalledWith({
        type: LOG_EVENT.SELECT_FAV,
        params: {
          name: props.favorites[0].name,
          conjugation_name: conjugation?.name,
          conjugated: conjugation?.conjugation,
          honorific: conjugation?.honorific,
        },
      });
      expect(push).toHaveBeenCalledWith("ConjInfo", { conjugation });
    });
  });

  it("hides favorites with no conjugations", async () => {
    const customFavorites = [
      favorites[0],
      {
        name: "Favorite 2",
        conjugationName: ConjugationType.DETERMINER_PAST as ConjugationName,
        honorific: false,
      },
    ];

    const component = render(
      <FavoritesCard
        favorites={customFavorites}
        conjugations={[props.conjugations[0]]}
        alwaysHonorific={false}
        onPress={jest.fn()}
      />
    );

    expect(component.getByText("Favorite 1")).toBeTruthy();
    expect(component.queryByText("Favorite 2")).toBeNull();
  });

  it("distingushes b/w honorific and normal versions of a conjugation", () => {
    const customConj: Conjugation[] = [
      {
        name: "declarative present informal high",
        conjugation: "가요",
        ...baseConjugation,
      },
      {
        name: "declarative present informal high",
        conjugation: "가세요",
        ...baseConjugation,
        honorific: true,
      },
    ];

    const customFav: Favorite[] = [
      {
        name: "Regular Present",
        conjugationName: "declarative present informal high",
        honorific: false,
      },
      {
        name: "Honorific Present",
        conjugationName: "declarative present informal high",
        honorific: true,
      },
    ];

    const component = render(
      <FavoritesCard
        favorites={customFav}
        conjugations={customConj}
        alwaysHonorific={false}
        onPress={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("displays conjugations for always honorific verbs", () => {
    const customConj: Conjugation[] = [
      {
        name: "declarative past informal high",
        conjugation: "계셨어요",
        ...baseConjugation,
        honorific: true,
      },
      {
        name: "declarative present informal high",
        conjugation: "계세요",
        ...baseConjugation,
        honorific: true,
      },
    ];

    const customFav: Favorite[] = [
      {
        name: "Past",
        conjugationName: "declarative past informal high",
        honorific: false,
      },
      {
        name: "Present",
        conjugationName: "declarative present informal high",
        honorific: false,
      },
    ];

    const component = render(
      <FavoritesCard
        favorites={customFav}
        conjugations={customConj}
        alwaysHonorific={true}
        onPress={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
