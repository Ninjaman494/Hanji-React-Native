jest.mock("providers/SnackbarProvider");
jest.mock("hooks/useCreateSuggestion");
jest.mock("sentry-expo");
jest.mock("react-native-keyboard-aware-scroll-view", () => ({
  KeyboardAwareScrollView: ({ children }: { children: ReactNode }) => children,
}));

import useCreateSuggestion from "hooks/useCreateSuggestion";
import { useSnackbar } from "providers/SnackbarProvider";
import React, { ReactNode } from "react";
import "react-native";
import { fireEvent, render, waitFor } from "utils/testUtils";
import SuggestionPage from "../SuggestionPage";

const showSnackbar = jest.fn();
const showError = jest.fn();
(useSnackbar as jest.Mock).mockReturnValue({ showSnackbar, showError });

const createSuggestion = jest.fn();
(useCreateSuggestion as jest.Mock).mockReturnValue([createSuggestion]);

const props = {
  navigation: { goBack: jest.fn() },
  route: {
    params: { entryId: "foobar" },
  },
};

describe("SuggestionPage", () => {
  it("can submit a suggestion", async () => {
    const result = render(<SuggestionPage {...(props as any)} />);

    fireEvent.changeText(result.getByLabelText("Antonym"), "가다");
    fireEvent.changeText(result.getByLabelText("Korean Sentence"), "저는 가요");
    fireEvent.changeText(result.getByLabelText("English Translation"), "I go");
    fireEvent.press(result.getByText("Submit"));

    await waitFor(() => {
      expect(createSuggestion).toHaveBeenCalledWith({
        variables: {
          suggestion: {
            entryID: "foobar",
            antonyms: ["가다"],
            synonyms: undefined,
            examples: [
              {
                sentence: "저는 가요",
                translation: "I go",
              },
            ],
          },
        },
      });
      expect(showSnackbar).toHaveBeenCalledWith(
        "Thanks! Your suggestion has been sent for review."
      );
      expect(props.navigation.goBack).toHaveBeenCalled();
    });
  });

  it("can handle an error", async () => {
    const error = new Error();
    const createSuggestion = jest.fn().mockRejectedValue(error);
    (useCreateSuggestion as jest.Mock).mockReturnValue([createSuggestion]);

    const result = render(<SuggestionPage {...(props as any)} />);

    fireEvent.changeText(result.getByLabelText("Synonym"), "오다");
    fireEvent.press(result.getByText("Submit"));

    await waitFor(() => {
      expect(createSuggestion).toHaveBeenCalledWith({
        variables: {
          suggestion: {
            entryID: "foobar",
            synonyms: ["오다"],
          },
        },
      });
      expect(showError).toHaveBeenCalledWith(error);
      expect(props.navigation.goBack).not.toHaveBeenCalled();
    });
  });
});
