import { FormikForm, FormikRadioGroup, FormikTextField } from "components";
import FormikCheckboxGroup from "components/formikBindings/FormikCheckboxGroup";
import { Formik } from "formik";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import { Button, Headline, Paragraph } from "react-native-paper";
import { Slide } from "./types";

export interface SurveySlideProps {
  slide: Slide;
  onBack: () => void;
  onSubmit: (value: any) => void;
}

const SurveySlide: FC<SurveySlideProps> = ({ slide, onBack, onSubmit }) => {
  const Content = useCallback(() => {
    switch (slide.type) {
      case "input":
        return <FormikTextField name="question" label={slide.question} />;
      case "checkbox":
        return <FormikCheckboxGroup name="question" options={slide.options} />;
      case "radio":
        return (
          <FormikRadioGroup
            name="question"
            label={slide.question}
            options={slide.options}
          />
        );
      case "intro":
        return <Paragraph>{slide.description}</Paragraph>;
    }
  }, [slide]);

  const Form = ({
    dirty,
    isValid,
    handleSubmit,
  }: {
    dirty: boolean;
    isValid: boolean;
    handleSubmit: () => void;
  }) => (
    <>
      <Headline>
        {slide.type === "intro" ? slide.header : slide.question}
      </Headline>
      <Content />
      <Button onPress={onBack}>Back</Button>
      <Button disabled={!dirty || !isValid} onPress={handleSubmit}>
        Submit
      </Button>
    </>
  );

  return (
    <View>
      {slide.type !== "intro" ? (
        <Formik initialValues={{}} onSubmit={onSubmit}>
          {({ dirty, isValid, handleSubmit }) => (
            <FormikForm>
              <Form
                dirty={dirty}
                isValid={isValid}
                handleSubmit={handleSubmit}
              />
            </FormikForm>
          )}
        </Formik>
      ) : (
        <Form dirty={true} isValid={true} handleSubmit={() => onSubmit(null)} />
      )}
    </View>
  );
};

export default SurveySlide;
