import React, { useState } from "react";
import { Appbar, IconButton, TextInput } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useHistory } from "react-router";

const theme = {
  colors: {
    text: "white",
    color: "white",
    primary: "white",
    background: "transparent",
  },
};

const style = StyleSheet.create({
  input: {
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 57,
    overflow: "hidden",
  },
});

const AppBar: React.FC = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();

  const doSearch = () => {
    if (searchQuery) {
      history.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <Appbar.Header>
      <Appbar.Content title="Display Page" />
      {showSearch && (
        <View style={{ flexDirection: "row" }}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={doSearch}
            placeholder="Search in Korean or English..."
            theme={theme}
            style={style.input}
            underlineColor="transparent"
          />
          <IconButton
            icon="window-close"
            color="white"
            onPress={() => toggleSearch(!showSearch)}
          />
        </View>
      )}
      {!showSearch && (
        <Appbar.Action
          icon="magnify"
          onPress={() => toggleSearch(!showSearch)}
        />
      )}
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default AppBar;
