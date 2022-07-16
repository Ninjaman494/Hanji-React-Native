import CustomTextInput from "components/CustomTextInput";
import React, { FC, useState } from "react";
import { View } from "react-native";
import { Button, Headline } from "react-native-paper";
import { TextInputSlide } from "./types";

export interface InputSlideProps {
  slide: TextInputSlide;
  onPress: (text: string) => void;
}

const InputSlide: FC<InputSlideProps> = ({ slide, onPress }) => {
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <Headline style={{ textAlign: "center", marginBottom: 32 }}>
          {slide.question}
        </Headline>
        <CustomTextInput
          mode="outlined"
          value={text}
          onChangeText={setText}
          multiline
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button mode="contained" onPress={() => onPress(text)}>
          Next
        </Button>
      </View>
    </View>
  );
};

export default InputSlide;
