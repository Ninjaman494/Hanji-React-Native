import * as React from "react";
import { Appbar, IconButton, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useHistory } from "react-router";

export const APP_BAR_HEIGHT = 56;

export interface AppBarProps {
  title?: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();

  const doSearch = () => {
    if (searchQuery) {
      history.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <Appbar.Header style={{ elevation: 0 }}>
      <Appbar.Content title={title} />
      {showSearch && (
        <View style={style.inputParent}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={doSearch}
            placeholder="Search in Korean or English..."
            theme={theme}
            style={style.input}
            underlineColor="transparent"
            autoFocus
          />
          <IconButton
            icon="window-close"
            color="white"
            onPress={() => setShowSearch(!showSearch)}
          />
        </View>
      )}
      {!showSearch && (
        <Appbar.Action
          icon="magnify"
          onPress={() => setShowSearch(!showSearch)}
        />
      )}
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
};

const theme = {
  colors: {
    text: "white",
    color: "white",
    primary: "white",
    background: "transparent",
  },
};

const style = StyleSheet.create({
  inputParent: {
    flexGrow: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flexGrow: 100,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: APP_BAR_HEIGHT,
    overflow: "hidden",
  },
});

export default AppBar;
