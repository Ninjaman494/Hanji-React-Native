import { useFocusEffect } from "@react-navigation/native";
import { AppBar } from "components";
import Constants from "expo-constants";
import * as StoreReview from "expo-store-review";
import useGetFavorites from "hooks/useGetFavorites";
import { useSnackbar } from "providers/SnackbarProvider";
import React, { useCallback, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import Purchases, { PurchasesError } from "react-native-purchases";
import { ScreenProps } from "typings/navigation";
import getPurchaseErrorMessage from "utils/getPurchaseErrorMessage";

const CHECK_AD_FREE_DESC = "Click here to check your ad-free status";

const SettingsPage: React.FC<ScreenProps<"Settings">> = ({ navigation }) => {
  const { colors } = useTheme();
  const { favorites, loading, refetch } = useGetFavorites();
  const { showSnackbar } = useSnackbar();
  const [checkDesc, setCheckDesc] = useState(CHECK_AD_FREE_DESC);

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

  const checkAdFree = useCallback(async () => {
    setCheckDesc("Checking ad-free status...");

    try {
      const { entitlements } = await Purchases.restorePurchases();
      showSnackbar(
        entitlements.active.ad_free_entitlement
          ? "Ad-free purchase activated, thank you for supporting Hanji!"
          : "Ad-free purchase not found"
      );
    } catch (e) {
      const errMsg = getPurchaseErrorMessage(e as PurchasesError);
      errMsg && showSnackbar(errMsg);
    }

    setCheckDesc(CHECK_AD_FREE_DESC);
  }, [setCheckDesc, showSnackbar]);

  // Refresh count when returning to page in case fav was deleted
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

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
          <List.Item
            title="Check Ad-free Status"
            description={checkDesc}
            onPress={checkAdFree}
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
