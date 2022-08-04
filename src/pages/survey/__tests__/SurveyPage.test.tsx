jest.mock("hooks/useCreateSurveySubmission");
jest.mock("providers/SnackbarProvider");
jest.mock("@react-native-async-storage/async-storage");

import AsyncStorage from "@react-native-async-storage/async-storage";

import useCreateSurveySubmission from "hooks/useCreateSurveySubmission";
import { useSnackbar } from "providers/SnackbarProvider";
import { FILLED_OUT_KEY } from "providers/SurveyHandler";
import React from "react";
import "react-native";
import logEvent, { LOG_EVENT } from "utils/logEvent";
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

const checkSubmission = async (formData: Submission) => {
  const submission = Object.keys(formData).map((key) => ({
    question: key,
    response: formData[key as keyof Submission],
  }));

  await waitFor(() =>
    expect(submitSurvey).toHaveBeenCalledWith({ variables: { submission } })
  );
};

describe("SurveyPage", () => {
  it.each`
    name                                 | other       | email
    ${"with everything"}                 | ${"foobar"} | ${"user@email.com"}
    ${"without email"}                   | ${"foobar"} | ${null}
    ${"without extra feedback or email"} | ${null}     | ${null}
  `("can submit a survey $name", async ({ other, email }) => {
    const submission: Submission = {
      skillLevel: "Intermediate",
      firstFeature: "Explanations",
      secondFeature: "Flashcards",
    };
    if (!!other) submission.otherFeedback = other;
    if (!!email) submission.email = email;

    const result = render(<SurveyPage {...(props as any)} />);

    await fillOutSurvey(result, submission);

    await checkSubmission(submission);
    expect(logEvent).toHaveBeenLastCalledWith({
      type: LOG_EVENT.SUBMIT_SURVEY,
      params: submission,
    });
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(FILLED_OUT_KEY, "true");
    expect(showSnackbar).toHaveBeenCalledWith("Thank you for your feedback!");
    expect(goBack).toHaveBeenCalled();
  });

  it("can handle errors", async () => {
    const submission: Submission = {
      skillLevel: "Intermediate",
      firstFeature: "Explanations",
      secondFeature: "Flashcards",
    };
    const error = new Error("ruh roh");
    submitSurvey.mockRejectedValueOnce(error);

    const result = render(<SurveyPage {...(props as any)} />);

    await fillOutSurvey(result, submission);

    await checkSubmission(submission);
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    expect(showError).toHaveBeenCalledWith(error);
    expect(goBack).not.toHaveBeenCalled();
  });
});
