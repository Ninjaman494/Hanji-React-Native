import CustomTextInput from "components/CustomTextInput";
import React, { FC, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Button, Headline, Text, useTheme } from "react-native-paper";

export interface FinalSlideProps {
  onPress: (text: string) => void;
}

const FinalSlide: FC<FinalSlideProps> = ({ onPress }) => {
  const { colors } = useTheme();
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 3 }}>
        <Headline style={{ textAlign: "center", marginBottom: 32 }}>
          One last thing...
        </Headline>
        <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 32 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
        <CustomTextInput
          mode="outlined"
          label="Email Address"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          value={text}
          onChangeText={setText}
        />
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <Button
          mode="contained"
          style={{ backgroundColor: colors.accent }}
          labelStyle={{ padding: 16 }}
          onPress={() => onPress(text)}
        >
          Submit
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FinalSlide;
