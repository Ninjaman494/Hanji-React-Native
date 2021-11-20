import { AppBar } from "components";
import Constants from "expo-constants";
import * as StoreReview from "expo-store-review";
import useGetFavorites from "hooks/useGetFavorites";
import React from "react";
import { Linking, StyleSheet, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import { ScreenProps } from "typings/navigation";

const SettingsPage: React.FC<ScreenProps<"Settings">> = ({ navigation }) => {
  const { colors } = useTheme();
  const { favorites, loading } = useGetFavorites();

  const styles = StyleSheet.create({
    parent: {
      flex: 1,
      height: 500,
    },
    header: {
      color: colors.accent,
      paddingBottom: 0,
    },
  });

  return (
    <View style={styles.parent}>
      <AppBar title="Settings" />
      <View>
        <List.Subheader style={styles.header}>Preferences</List.Subheader>
        <List.Section>
          <List.Item
            title="Favorites"
            onPress={() => navigation.push("Favorites")}
            description={
              loading ? "Loading..." : `You have ${favorites?.length} favorites`
            }
          />
        </List.Section>
        <List.Subheader style={styles.header}>Legal Information</List.Subheader>
        <List.Section>
          <List.Item
            title="Terms &amp; Conditions of Use"
            onPress={() => Linking.openURL("https://hanji.vercel.app/terms")}
          />
          <List.Item
            title="Privacy Policy"
            onPress={() => Linking.openURL("https://hanji.vercel.app/privacy")}
          />
        </List.Section>
        <List.Subheader style={styles.header}>About</List.Subheader>
        <List.Section>
          <List.Item
            title="Leave a Review"
            onPress={() => {
              const url = StoreReview.storeUrl();
              url && Linking.openURL(url);
            }}
          />
          <List.Item
            title="Acknowledgements"
            onPress={() => navigation.push("Acknowledgements")}
          />
          <List.Item title="Version" description={Constants.nativeAppVersion} />
        </List.Section>
      </View>
    </View>
  );
};

export default SettingsPage;
