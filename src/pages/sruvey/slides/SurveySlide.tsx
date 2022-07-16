import CustomTextInput from "components/CustomTextInput";
import TwoLineButton from "components/TwoLineButton";
import React, { FC, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline, Text } from "react-native-paper";
import { Slide } from "./types";

export interface SurveySlideProps {
  slide: Slide;
  btnText: string;
  onPress: (value: string | null) => void;
}

const SurveySlide: FC<SurveySlideProps> = ({ slide, btnText, onPress }) => {
  const [text, setText] = useState("");

  const Content = useCallback(() => {
    switch (slide.type) {
      case "input":
        return (
          <CustomTextInput
            value={text}
            onChangeText={(text) => setText(text)}
            multiline
          />
        );
      case "radio":
        return (
          <>
            {slide.options.map(({ title, description, value }) => (
              <TwoLineButton
                key={title}
                title={title}
                description={description}
                onPress={() => onPress(value)}
                style={{ marginBottom: 8 }}
              />
            ))}
          </>
        );
      case "intro":
        return <Text style={styles.intro}>{slide.description}</Text>;
    }
  }, [slide, text, setText]);

  return (
    <View style={styles.root}>
      <View style={{ flex: 3 }}>
        <Headline style={styles.headline}>
          {slide.type === "intro" ? slide.header : slide.question}
        </Headline>
        <Content />
      </View>
      {slide.type !== "radio" && (
        <View style={{ flex: 1 }}>
          <Button
            mode="contained"
            onPress={() => onPress(slide.type === "input" ? text : null)}
          >
            {btnText}
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
