import { AppBar, AppLayout } from "components";
import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { ScreenProps } from "typings/navigation";

const SuggestionPage: FC<ScreenProps<"Suggestion">> = ({ route }) => {
  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Favorites" />
      <AppLayout>
        <Text>Hello World! {route.params.entryId}</Text>
      </AppLayout>
    </View>
  );
};

export default SuggestionPage;
