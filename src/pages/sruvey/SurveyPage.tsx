import { AppBar } from "components";
import React, { FC, useState } from "react";
import { View } from "react-native";
import { ScreenProps } from "typings/navigation";
import InputSlide from "./slides/InputSlide";
import IntroSlide from "./slides/IntroSlide";
import RadioSlide from "./slides/RadioSlide";
import { Slide } from "./slides/types";

const slides: Slide[] = [
  {
    type: "intro",
    header: "Welcome",
    description:
      'Thank you for agreeing to fill out our survey! This short, 3 question survey should only take a minute or two to complete and helps us make Hanji even better for users like you. Hit "Next" to get started',
  },
  {
    type: "radio",
    name: "skillLevel",
    question: "What's your Korean language skill level?",
    required: true,
    options: [
      {
        title: "Beginner",
        description: "~0-1 years",
        value: "beginner",
      },
      {
        title: "Intermediate",
        description: "~0-1 years",
        value: "intermediate",
      },
      {
        title: "Expert",
        description: "~0-1 years",

        value: "expert",
      },
      {
        title: "Native Speaker",
        description: "~0-1 years",
        value: "native",
      },
    ],
  },
  {
    type: "radio",
    name: "requestedFeature",
    question: "What feature would you most like to see?",
    required: true,
    options: [
      {
        title: "Flashcards",
        description:
          "Create flashcards of words and study them in different conjugations",
        value: "flashcards",
      },
      {
        title: "Stories",
        description:
          "Korean stories with English translations for reading practice",
        value: "stories",
      },
      {
        title: "Saved Words",
        description: "Save words and their conjugations for offline use",
        value: "saved",
      },
      {
        title: "Explanations",
        description:
          "Detailed explanations of each conjugation and how they should be used",
        value: "explanations",
      },
    ],
  },
  {
    type: "input",
    name: "otherFeedback",
    question: "Are there any other features you'd like to see in Hanji?",
  },
];

const SurveyPage: FC<ScreenProps<"Survey">> = () => {
  const [sIndex, setIndex] = useState(0);
  const isLastSlide = sIndex === slides.length - 1;
  const slide = slides[sIndex];

  const [data, setData] = useState({});
  console.log(data);

  const incrementSlide = () => {
    !isLastSlide && setIndex(sIndex + 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Survey" />
      <View style={{ flex: 1, margin: 32 }}>
        {slide.type === "input" && (
          <InputSlide
            slide={slide}
            onPress={(val) => {
              setData({ ...data, [slide.name]: val });
              incrementSlide();
            }}
          />
        )}
        {slide.type == "radio" && (
          <RadioSlide
            slide={slide}
            onPress={(val) => {
              setData({ ...data, [slide.name]: val });
              incrementSlide();
            }}
          />
        )}
        {slide.type === "intro" && (
          <IntroSlide slide={slide} onPress={incrementSlide} />
        )}
      </View>
    </View>
  );
};

export default SurveyPage;
