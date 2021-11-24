import React from "react";
import "react-native";
import { fireEvent, render, waitFor } from "utils/testUtils";
import SuggestionForm from "../SuggestionForm";

const onSubmit = jest.fn();

describe("SuggestionForm", () => {
  it("submits the form", async () => {
    const result = render(<SuggestionForm onSubmit={onSubmit} />);

    fireEvent.changeText(result.getByLabelText("Antonym"), "가다");
    fireEvent.changeText(result.getByLabelText("Synonym"), "오다");
    fireEvent.changeText(result.getByLabelText("Korean Sentence"), "저는 가요");
    fireEvent.changeText(result.getByLabelText("English Translation"), "I go");
    fireEvent.press(result.getByText("Submit"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          antonym: "가다",
          synonym: "오다",
          example: {
            sentence: "저는 가요",
            translation: "I go",
          },
        }),
        expect.anything()
      );
    });
  });

  it("requires at least one addition", async () => {
    const result = render(<SuggestionForm onSubmit={onSubmit} />);

    fireEvent.changeText(result.getByLabelText("Antonym"), "가다");
    await waitFor(() => {
      expect(
        (result.getByRole("button") as any).parent.parent.props.disabled
      ).toBeFalsy();
    });

    fireEvent.changeText(result.getByLabelText("Antonym"), "");
    await waitFor(() => {
      expect(
        (result.getByRole("button") as any).parent.parent.props.disabled
      ).toBeTruthy();
    });
  });

  describe("language checks", () => {
    it.each(["Antonym", "Synonym", "Korean Sentence"])(
      "doesn't allow English values for %s",
      async (label) => {
        const result = render(<SuggestionForm onSubmit={onSubmit} />);

        fireEvent.changeText(result.getByLabelText(label), "foobar");

        await waitFor(() => {
          expect(
            result.getByText(
              `${label.replace("Korean ", "")} must be in Korean`
            )
          ).toBeTruthy();
          expect(onSubmit).not.toHaveBeenCalled();
        });
      }
    );

    it("doesn't allow Korean values for English Translation", async () => {
      const result = render(<SuggestionForm onSubmit={onSubmit} />);

      fireEvent.changeText(
        result.getByLabelText("English Translation"),
        "가다"
      );

      await waitFor(() => {
        expect(result.getByText("Translation must be in English")).toBeTruthy();
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });

  describe("example checks", () => {
    it("requires translation when sentence is provided", async () => {
      const result = render(<SuggestionForm onSubmit={onSubmit} />);

      fireEvent.changeText(result.getByLabelText("Korean Sentence"), "가다");

      await waitFor(() => {
        expect(
          result.getByText("Translation is required for example")
        ).toBeTruthy();
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });

    it("requires sentence when translation is provided", async () => {
      const result = render(<SuggestionForm onSubmit={onSubmit} />);

      fireEvent.changeText(
        result.getByLabelText("English Translation"),
        "foobar"
      );

      await waitFor(() => {
        expect(
          result.getByText("Sentence is required for example")
        ).toBeTruthy();
        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });
});
