import { useNavigation } from "@react-navigation/native";
import { AppBar } from "components";
import useCreateSurveySubmission from "hooks/useCreateSurveySubmission";
import { useSnackbar } from "providers/SnackbarProvider";
import React, { FC, useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { NavigationProps, ScreenProps } from "typings/navigation";
import { InputSlide, IntroSlide, RadioSlide, Slide } from "./slides";
import FinalSlide from "./slides/FinalSlide";

const slides: Slide[] = [
  {
    type: "intro",
    header: "Welcome",
    description:
      'Thank you for agreeing to fill out our survey! This short 4 question survey should only take a minute or two to complete and helps us make Hanji even better for users like you. Hit "Next" to get started',
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
        description: "~1-2 years",
        value: "intermediate",
      },
      {
        title: "Expert",
        description: "~3-5 years",

        value: "expert",
      },
      {
        title: "Native Speaker",
        description: "5+ years",
        value: "native",
      },
    ],
  },
  {
    type: "radio",
    name: "firstFeature",
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
        value: "savedWords",
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
        value: "savedWords",
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
  const [submitSurvey] = useCreateSurveySubmission();
  const navigation = useNavigation<NavigationProps>();
  const { showSnackbar, showError } = useSnackbar();

  const [index, setIndex] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const slide = slides[index];

  // Diable back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const incrementSlide = () => index < slides.length - 1 && setIndex(index + 1);

  const addData = (name: string, val?: string) => {
    const updatedData = val ? { ...data, [name]: val } : data;
    setData(updatedData);
    return updatedData;
  };

  const submitForm = async (formData: Record<string, string>) => {
    try {
      const submission = Object.keys(formData).map((k) => ({
        question: k,
        response: formData[k],
      }));

      console.log("Submission", JSON.stringify(submission, null, 2));

      await submitSurvey({ variables: { submission } });
      showSnackbar("Thank you for your feedback!");
      navigation.goBack();
    } catch (err) {
      showError(err as Error);
    }
  };

  // Options for second request feature are dynamic
  if (index === 3 && slide.type === "radio") {
    slide.options = slide.options.filter(
      (o) => o.value !== data["firstFeature"]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Survey" hideBack />
      <View style={{ flex: 1, margin: 32 }}>
        {slide.type === "input" && (
          <InputSlide
            slide={slide}
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
              const d = addData("email", val);
              submitForm(d);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default SurveyPage;
