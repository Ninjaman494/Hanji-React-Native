import Constants from "expo-constants";
import * as React from "react";
import { useState } from "react";
import { TextInput as NativeInput } from "react-native";
import { Appbar, Menu, useTheme } from "react-native-paper";
import { useHistory } from "react-router";
import { useViewShot } from "./ViewShotProvider";

export const APP_BAR_HEIGHT = 56;

export interface AppBarProps {
  title?: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMenu, setShowMenu] = useState(false);

  const history = useHistory();
  const takeScreenshot = useViewShot();
  const { colors, padding } = useTheme();

  const inputStyle = {
    flexGrow: 1,
    marginLeft: padding?.horizontal,
    fontSize: 18,
    color: "white",
  };

  const doSearch = () => {
    if (searchQuery) {
      history.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <Appbar.Header style={{ elevation: 0, zIndex: 100 }}>
      <Appbar.BackAction onPress={() => history.goBack()} />
      {showSearch ? (
        <NativeInput
          testID="appBarSearch"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={doSearch}
          placeholder="Search in Korean or English..."
          placeholderTextColor={colors.primaryLight}
          selectionColor={colors.accent}
          style={inputStyle}
          autoFocus
        />
      ) : (
        <Appbar.Content title={title} />
      )}
      <Appbar.Action
        testID="appBarSearchBtn"
        icon={showSearch ? "window-close" : "magnify"}
        onPress={() => setShowSearch(!showSearch)}
      />
      <Menu
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        statusBarHeight={Constants.statusBarHeight}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            color="white"
            onPress={() => setShowMenu(true)}
          />
        }
      >
        <Menu.Item onPress={() => history.push(`/settings`)} title="Settings" />
        <Menu.Item onPress={() => {}} title="About" />
        <Menu.Item
          onPress={async () => {
            const uri = await takeScreenshot?.();
            history.push("/bugReport", { screenshot: uri });
          }}
          title="Report a Bug"
        />
      </Menu>
    </Appbar.Header>
  );
};

export default AppBar;
