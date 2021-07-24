import { AppBar } from "components";
import useGetFavorites from "hooks/useGetFavorites";
import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { List, useTheme } from "react-native-paper";
import { useHistory } from "react-router";
import { version } from "../../../package.json";

const SettingsPage: React.FC = () => {
  const { colors } = useTheme();
  const { favorites, loading } = useGetFavorites();
  const history = useHistory();

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
            onPress={() => history.push("/favorites")}
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
          <List.Item title="Leave a Review" />
          <List.Item
            title="Acknowledgements"
            onPress={() => history.push("/acknowledgements")}
          />
          <List.Item title="Version" description={version} />
        </List.Section>
      </View>
    </View>
  );
};

export default SettingsPage;
