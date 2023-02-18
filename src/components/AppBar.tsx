import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import useUserContext from "hooks/useUserContext";
import { useSnackbar } from "providers/SnackbarProvider";
import { useViewShot } from "providers/ViewShotProvider";
import * as React from "react";
import { useEffect, useState } from "react";
import { TextInput as NativeInput } from "react-native";
import { Appbar, Menu, useTheme } from "react-native-paper";
import { NavigationProps, PageName } from "typings/navigation";
import { PopupName } from "typings/popup";
import buyAdFree from "utils/buyAdFree";
import HintTooltip from "./HintTooltip";

export const APP_BAR_HEIGHT = 56 + Constants.statusBarHeight;

export interface AppBarProps {
  title?: string;
  hideSearch?: boolean;
  hideBack?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ title, hideSearch, hideBack }) => {
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMenu, setShowMenu] = useState(false);

  const { isAdFree } = useUserContext();
  const navigation = useNavigation<NavigationProps>();
  const takeScreenshot = useViewShot();
  const { showSnackbar } = useSnackbar();
  const { colors, padding } = useTheme();

  const inputStyle = {
    flexGrow: 1,
    marginLeft: padding?.horizontal,
    fontSize: 18,
    color: "white",
  };

  // Reset state when leaving page
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setSearching(false);
      setSearchQuery("");
      setShowMenu(false);
    });

    // Return the function so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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
          onSubmitEditing={() =>
            searchQuery &&
            navigation.push(PageName.SEARCH, { query: searchQuery })
          }
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
      <HintTooltip
        popupName={PopupName.FAVORITES}
        text="Customize Favorites in Settings"
        from={
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
              onPress={() => navigation.push(PageName.SETTINGS)}
              title="Settings"
            />
            <Menu.Item
              onPress={async () => {
                const uri = await takeScreenshot?.();
                navigation.push(PageName.BUGREPORT, {
                  screenshot: uri as string,
                });
              }}
              title="Report a Bug"
            />
            {!isAdFree && (
              <Menu.Item
                onPress={() => buyAdFree(showSnackbar)}
                title="Remove Ads"
              />
            )}
          </Menu>
        }
      />
    </Appbar.Header>
  );
};

export default AppBar;
