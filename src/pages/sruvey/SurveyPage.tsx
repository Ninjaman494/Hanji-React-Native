import { AppBar, FormikForm } from "components";
import { Formik } from "formik";
import React, { FC, useState } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";
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

  return (
    <>
      <AppBar title="Survey" />
      <ScrollView>
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            if (sIndex < slides.length - 1) {
              setIndex(sIndex + 1);
            } else {
              console.log(values);
            }
          }}
        >
          {({ dirty, isValid, handleSubmit }) => (
            <FormikForm>
              <SurveySlide slide={slides[sIndex]} />
              <Button onPress={() => sIndex > 0 && setIndex(sIndex - 1)}>
                Back
              </Button>
              <Button
                disabled={
                  (!dirty || !isValid) && slides[sIndex].type !== "intro"
                }
                onPress={handleSubmit}
              >
                Submit
              </Button>
            </FormikForm>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default SurveyPage;
