import AppBar from "components/AppBar";
import useGetFavorites from "hooks/useGetFavorites";
import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Divider, List, useTheme } from "react-native-paper";

const SettingsPage: React.FC = () => {
  const { colors, padding } = useTheme();
  const { favorites, loading } = useGetFavorites();

  const styles = StyleSheet.create({
    parent: {
      flex: 1,
      height: 500,
    },
    body: {
      marginHorizontal: padding.horizontal,
      marginVertical: padding.vertical,
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
          <Divider />
          <List.Item
            title="Privacy Policy"
            onPress={() => Linking.openURL("https://hanji.vercel.app/privacy")}
          />
          <Divider />
        </List.Section>
      </View>
    </View>
  );
};

export default SettingsPage;
