import { useNavigation } from "@react-navigation/native";
import { AppBar } from "components";
import { useSnackbar } from "providers/SnackbarProvider";
import React, { FC, useState } from "react";
import { View } from "react-native";
import { NavigationProps, ScreenProps } from "typings/navigation";
import { InputSlide, IntroSlide, RadioSlide, Slide } from "./slides";
import FinalSlide from "./slides/FinalSlide";

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
    type: "radio",
    name: "secondFeature",
    question: "What other feature would you most like to see?",
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
  { type: "final" },
];

const SurveyPage: FC<ScreenProps<"Survey">> = () => {
  const navigation = useNavigation<NavigationProps>();
  const { showSnackbar } = useSnackbar();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});

  const incrementSlide = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      showSnackbar("Thank you for your feedback!");
      navigation.goBack();
    }
  };

  const addData = (name: string, val?: string) =>
    val && setData({ ...data, [name]: val });

  const slide = slides[index];

  // Options for second request feature are dynamic
  if (index === 3 && slide.type === "radio") {
    slide.options = slide.options.filter(
      (o) => o.value !== data["requestedFeature"]
    );
  }

  console.log("DATA", data);

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Survey" hideBack />
      <View style={{ flex: 1, margin: 32 }}>
        {slide.type === "input" && (
          <InputSlide
            slide={slide}
            btnText={index < slides.length - 1 ? "Next" : "Submit"}
            onPress={(val) => {
              addData(slide.name, val);
              incrementSlide();
            }}
          />
        )}
        {slide.type == "radio" && (
          <RadioSlide
            slide={slide}
            onPress={(val) => {
              addData(slide.name, val);
              incrementSlide();
            }}
          />
        )}
        {slide.type === "intro" && (
          <IntroSlide slide={slide} onPress={incrementSlide} />
        )}
        {slide.type === "final" && (
          <FinalSlide
            onPress={(val) => {
              addData("email", val);
              incrementSlide();
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SurveyPage;
