import { FormikRadioGroup, FormikTextField } from "components";
import FormikCheckboxGroup from "components/formikBindings/FormikCheckboxGroup";
import React, { FC, useCallback } from "react";
import { View } from "react-native";
import { Headline, Paragraph } from "react-native-paper";
import { Slide } from "./types";

export interface SurveySlideProps {
  slide: Slide;
}

const SurveySlide: FC<SurveySlideProps> = ({ slide }) => {
  const Content = useCallback(() => {
    switch (slide.type) {
      case "input":
        return <FormikTextField name={slide.name} />;
      case "checkbox":
        return (
          <FormikCheckboxGroup name={slide.name} options={slide.options} />
        );
      case "radio":
        return <FormikRadioGroup name={slide.name} options={slide.options} />;
      case "intro":
        return <Paragraph>{slide.description}</Paragraph>;
    }
  }, [slide]);

  return (
    <View>
      <Headline>
        {slide.type === "intro" ? slide.header : slide.question}
      </Headline>
      <Content />
    </View>
  );
};

export default SurveySlide;
