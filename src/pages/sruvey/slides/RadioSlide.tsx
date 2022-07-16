import TwoLineButton from "components/TwoLineButton";
import React, { FC } from "react";
import { View } from "react-native";
import { Headline } from "react-native-paper";
import { RadioBtnSlide } from "./types";

export interface RadioSlideProps {
  slide: RadioBtnSlide;
  onPress: (text: string) => void;
}

const RadioSlide: FC<RadioSlideProps> = ({ slide, onPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <Headline style={{ textAlign: "center", marginBottom: 32 }}>
        {slide.question}
      </Headline>
      {slide.options.map(({ title, description, value }) => (
        <TwoLineButton
          key={title}
          title={title}
          description={description}
          onPress={() => onPress(value)}
          style={{ marginBottom: 8 }}
        />
      ))}
    </View>
  );
};

export default RadioSlide;
