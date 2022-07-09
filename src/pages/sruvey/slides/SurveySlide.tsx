import { FormikRadioGroup, FormikTextField } from "components";
import FormikCheckboxGroup from "components/formikBindings/FormikCheckboxGroup";
import React, { FC, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Headline, Text } from "react-native-paper";
import { Slide } from "./types";

export interface SurveySlideProps {
  slide: Slide;
}

const SurveySlide: FC<SurveySlideProps> = ({ slide }) => {
  const Content = useCallback(() => {
    switch (slide.type) {
      case "input":
        return <FormikTextField name={slide.name} multiline />;
      case "checkbox":
        return (
          <FormikCheckboxGroup name={slide.name} options={slide.options} />
        );
      case "radio":
        return <FormikRadioGroup name={slide.name} options={slide.options} />;
      case "intro":
        return <Text style={styles.intro}>{slide.description}</Text>;
    }
  }, [slide]);

  return (
    <View style={styles.root}>
      <Headline style={styles.headline}>
        {slide.type === "intro" ? slide.header : slide.question}
      </Headline>
      <Content />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 3,
    marginLeft: 32,
    marginRight: 48,
    marginVertical: 48,
  },
  headline: {
    textAlign: "center",
    marginBottom: 32,
  },
  intro: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SurveySlide;
