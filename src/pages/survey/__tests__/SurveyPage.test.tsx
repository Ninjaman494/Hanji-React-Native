jest.mock("hooks/useCreateSurveySubmission");
jest.mock("providers/SnackbarProvider");

import useCreateSurveySubmission from "hooks/useCreateSurveySubmission";
import { useSnackbar } from "providers/SnackbarProvider";
import React from "react";
import "react-native";
import { fireEvent, render, RenderAPI, waitFor } from "utils/testUtils";
import SurveyPage from "../SurveyPage";

const submitSurvey = jest.fn();
(useCreateSurveySubmission as jest.Mock).mockReturnValue([submitSurvey]);

const showSnackbar = jest.fn();
const showError = jest.fn();
(useSnackbar as jest.Mock).mockReturnValue({ showSnackbar, showError });

const goBack = jest.fn();
const props = { navigation: { goBack } };

type Submission = {
  skillLevel: "Beginner" | "Intermediate" | "Expert" | "Native Speaker";
  firstFeature: "Flashcards" | "Stories" | "Saved Words" | "Explanations";
  secondFeature: "Flashcards" | "Stories" | "Saved Words" | "Explanations";
  otherFeedback?: string;
  email?: string;
};

const fillOutSurvey = async (
  result: RenderAPI,
  { skillLevel, firstFeature, secondFeature, otherFeedback, email }: Submission
) => {
  // Intro -> Skill Level -> First Feature
  fireEvent.press(result.getByText("Next"));
  fireEvent.press(result.getByText(skillLevel));
  fireEvent.press(result.getByText(firstFeature));

  // Second Feature
  await waitFor(() => expect(result.queryByText(firstFeature)).toBeNull());
  fireEvent.press(result.getByText(secondFeature));

  if (otherFeedback) {
    fireEvent.changeText(result.getByLabelText("otherFeedback"), otherFeedback);
  }
  fireEvent.press(result.getByText("Next"));

  if (email) {
    fireEvent.changeText(result.getByLabelText("Email Address"), email);
  }
  fireEvent.press(result.getByText("Submit"));
};

describe("SurveyPage", () => {
  it("can submit a survey", async () => {
    const result = render(<SurveyPage {...(props as any)} />);

    await fillOutSurvey(result, {
      skillLevel: "Intermediate",
      firstFeature: "Explanations",
      secondFeature: "Flashcards",
      otherFeedback: "foobar",
      email: "user@email.com",
    });

    await waitFor(() => {
      expect(submitSurvey).toHaveBeenCalledWith({
        variables: {
          submission: [
            { question: "skillLevel", response: "intermediate" },
            { question: "firstFeature", response: "explanations" },
            { question: "secondFeature", response: "flashcards" },
            { question: "otherFeedback", response: "foobar" },
            { question: "email", response: "user@email.com" },
          ],
        },
      });
      expect(showSnackbar).toHaveBeenCalledWith("Thank you for your feedback!");
      expect(goBack).toHaveBeenCalled();
    });
  });

  it("can submit without email", async () => {
    const result = render(<SurveyPage {...(props as any)} />);

    await fillOutSurvey(result, {
      skillLevel: "Intermediate",
      firstFeature: "Explanations",
      secondFeature: "Flashcards",
      otherFeedback: "foobar",
    });

    await waitFor(() => {
      expect(submitSurvey).toHaveBeenCalledWith({
        variables: {
          submission: [
            { question: "skillLevel", response: "intermediate" },
            { question: "firstFeature", response: "explanations" },
            { question: "secondFeature", response: "flashcards" },
            { question: "otherFeedback", response: "foobar" },
          ],
        },
      });
      expect(showSnackbar).toHaveBeenCalledWith("Thank you for your feedback!");
      expect(goBack).toHaveBeenCalled();
    });
  });

  it("can submit without additional feedback", async () => {
    const result = render(<SurveyPage {...(props as any)} />);

    await fillOutSurvey(result, {
      skillLevel: "Intermediate",
      firstFeature: "Explanations",
      secondFeature: "Flashcards",
    });

    await waitFor(() => {
      expect(submitSurvey).toHaveBeenCalledWith({
        variables: {
          submission: [
            { question: "skillLevel", response: "intermediate" },
            { question: "firstFeature", response: "explanations" },
            { question: "secondFeature", response: "flashcards" },
          ],
        },
      });
      expect(showSnackbar).toHaveBeenCalledWith("Thank you for your feedback!");
      expect(goBack).toHaveBeenCalled();
    });
  });

  it("can handle errors", async () => {
    const error = new Error("ruh roh");
    submitSurvey.mockRejectedValueOnce(error);

    const result = render(<SurveyPage {...(props as any)} />);

    await fillOutSurvey(result, {
      skillLevel: "Intermediate",
      firstFeature: "Explanations",
      secondFeature: "Flashcards",
    });

    await waitFor(() => {
      expect(submitSurvey).toHaveBeenCalledWith({
        variables: {
          submission: [
            { question: "skillLevel", response: "intermediate" },
            { question: "firstFeature", response: "explanations" },
            { question: "secondFeature", response: "flashcards" },
          ],
        },
      });
      expect(showError).toHaveBeenCalledWith(error);
      expect(goBack).not.toHaveBeenCalled();
    });
  });
});
