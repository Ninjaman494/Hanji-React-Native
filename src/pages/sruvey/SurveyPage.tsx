import { AppBar, FormikForm } from "components";
import { Formik } from "formik";
import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { ScreenProps } from "typings/navigation";
import SurveySlide from "./slides/SurveySlide";
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
    name: "requestedFeature",
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
    name: "otherFeedback",
    question: "Are there any other features you'd like to see in Hanji?",
  },
];

const SurveyPage: FC<ScreenProps<"Survey">> = () => {
  const [sIndex, setIndex] = useState(0);
  const isLastSlide = sIndex === slides.length - 1;
  const slide = slides[sIndex];

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Survey" />
      <Formik
        initialValues={{} as Record<string, any>}
        onSubmit={(values) =>
          isLastSlide ? console.log(values) : setIndex(sIndex + 1)
        }
      >
        {({ values, handleSubmit }) => (
          <FormikForm style={{ flex: 1 }}>
            <SurveySlide slide={slides[sIndex]} />
            <View style={styles.buttonGroup}>
              <Button
                mode="outlined"
                style={{ marginRight: 16 }}
                onPress={() => sIndex > 0 && setIndex(sIndex - 1)}
              >
                Back
              </Button>
              <Button
                mode="contained"
                disabled={
                  slide.type !== "intro" &&
                  slide.required &&
                  !values[slide.name]
                }
                onPress={handleSubmit}
              >
                {isLastSlide ? "Submit" : "Next"}
              </Button>
            </View>
          </FormikForm>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default SurveyPage;
