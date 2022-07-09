import { AppBar } from "components";
import React, { FC, useState } from "react";
import { ScrollView } from "react-native";
import { ScreenProps } from "typings/navigation";
import SurveySlide from "./slides/SurveySlide";
import { Slide } from "./slides/types";

const slides: Slide[] = [
  {
    type: "intro",
    header: "Hello World!",
    description: "Thanks for filling out our survey",
  },
  {
    type: "radio",
    question: "What's your Korean language skill level?",
    required: true,
    options: [
      {
        label: "Beginner",
        value: "beginner",
      },
      {
        label: "Intermediate",
        value: "intermediate",
      },
      {
        label: "Expert",
        value: "expert",
      },
      {
        label: "Native Speaker",
        value: "native",
      },
    ],
  },
  {
    type: "radio",
    question: "What feature would you most like to see?",
    required: true,
    options: [
      { value: "offline", label: "Offline dictionary lookup" },
      {
        value: "flashcards",
        label: "Flashcards with conjugations",
      },
      {
        value: "stories",
        label: "Korean stories with English translations",
      },
      {
        value: "saved",
        label: "Saved words with conjugations for offline use",
      },
      {
        value: "explanations",
        label: "Explanations of how each conjugation is used",
      },
    ],
  },
  {
    type: "input",
    question: "Are there any other features you'd like to see in Hanji?",
  },
];

const SurveyPage: FC<ScreenProps<"Survey">> = () => {
  const [sIndex, setIndex] = useState(0);

  return (
    <>
      <AppBar title="Survey" />
      <ScrollView>
        <SurveySlide
          slide={slides[sIndex]}
          onBack={() => sIndex > 0 && setIndex(sIndex - 1)}
          onSubmit={() => sIndex < slides.length && setIndex(sIndex + 1)}
        />
      </ScrollView>
    </>
  );
};

export default SurveyPage;
