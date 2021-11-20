import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as React from "react";
import { useState } from "react";
import { TextInput as NativeInput } from "react-native";
import { Appbar, Menu, useTheme } from "react-native-paper";
import { NavigationProps } from "typings/navigation";
import { useViewShot } from "./ViewShotProvider";

export const APP_BAR_HEIGHT = 84;

export interface AppBarProps {
  title?: string;
  hideSearch?: boolean;
  hideBack?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ title, hideSearch, hideBack }) => {
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMenu, setShowMenu] = useState(false);

  const navigation = useNavigation<NavigationProps>();
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
      navigation.push("Search", { query: searchQuery });
    }
  };

  return (
    <Appbar.Header style={{ elevation: 0, zIndex: 100 }}>
      {!hideBack && (
        <Appbar.BackAction
          accessibilityLabel="back button"
          onPress={() => navigation.goBack()}
        />
      )}
      {searching ? (
        <NativeInput
          accessibilityLabel="search input"
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
      {!hideSearch && (
        <Appbar.Action
          accessibilityLabel="search button"
          icon={searching ? "window-close" : "magnify"}
          onPress={() => setSearching(!searching)}
        />
      )}
      <Menu
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        statusBarHeight={Constants.statusBarHeight}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            color="white"
            accessibilityLabel="overflow menu button"
            onPress={() => setShowMenu(true)}
          />
        }
      >
        <Menu.Item
          onPress={() => navigation.push("Settings")}
          title="Settings"
        />
        <Menu.Item
          onPress={async () => {
            const uri = await takeScreenshot?.();
            navigation.push("BugReport", { screenshot: uri as string });
          }}
          title="Report a Bug"
        />
      </Menu>
    </Appbar.Header>
  );
};

export default AppBar;
