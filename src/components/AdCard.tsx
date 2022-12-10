import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import "react-native";
import { View } from "react-native";
import { AppodealBanner } from "react-native-appodeal";
import { NavigationProps } from "typings/navigation";
import BaseCard, { BaseCardProps } from "./BaseCard";

const AdCard = (props: BaseCardProps): JSX.Element | null => {
  const navigation = useNavigation<NavigationProps>();
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const updateBannerVisibility = () => setShowAd(true);

    navigation.addListener("transitionEnd", updateBannerVisibility);

    return () => {
      navigation.removeListener("transitionEnd", updateBannerVisibility);
    };
  });

  return (
    <BaseCard title="Ad" testID="adCardBase" {...props}>
      {showAd ? (
        <AppodealBanner
          style={{
            height: 250,
            width: "100%",
            alignContent: "stretch",
            alignSelf: "center",
          }}
          adSize="mrec"
          usesSmartSizing // (iOS specific) on Android smart banners are enabled by default.
          onAdLoaded={() => console.log("Banner view did load")}
          onAdExpired={() => console.log("Banner view expired")}
          onAdClicked={() => console.log("Banner view is clicked")}
          onAdFailedToLoad={() => console.log("Banner view failed to load")}
        />
      ) : (
        <View style={{ height: 250 }} />
      )}
    </BaseCard>
  );
};

export default AdCard;
