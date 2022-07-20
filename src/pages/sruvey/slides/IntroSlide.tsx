import React, { FC } from "react";
import { View } from "react-native";
import { Button, Headline, Text, useTheme } from "react-native-paper";
import { IntroSlide as SlideType } from "./types";

export interface IntroSlideProps {
  slide: SlideType;
  onPress: () => void;
}

const IntroSlide: FC<IntroSlideProps> = ({ slide, onPress }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <Headline style={{ textAlign: "center", marginBottom: 32 }}>
          {slide.header}
        </Headline>
        <Text style={{ fontSize: 16, lineHeight: 24 }}>
          {slide.description}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          mode="contained"
          style={{ backgroundColor: colors.accent }}
          labelStyle={{ padding: 16 }}
          onPress={onPress}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

export default IntroSlide;
