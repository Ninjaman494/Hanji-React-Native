import { AppBar } from "components";
import React, { FC } from "react";
import { ScrollView, Text } from "react-native";
import { ScreenProps } from "typings/navigation";

const SurveyPage: FC<ScreenProps<"Survey">> = () => {
  return (
    <>
      <AppBar title="Survey" />
      <ScrollView>
        <Text>Hello World</Text>
      </ScrollView>
    </>
  );
};

export default SurveyPage;
