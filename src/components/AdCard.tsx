import { useNavigation } from "@react-navigation/native";
import useUserContext from "hooks/useUserContext";
import React, { useEffect, useState } from "react";
import "react-native";
import { View } from "react-native";
import { AppodealMrec } from "react-native-appodeal";
import { NavigationProps } from "typings/navigation";
import BaseCard, { BaseCardProps } from "./BaseCard";

const AdCard = (props: BaseCardProps): JSX.Element | null => {
  const { isAdFree } = useUserContext();
  const navigation = useNavigation<NavigationProps>();
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    if (isAdFree) return;

    const updateBannerVisibility = () => setShowAd(true);

    navigation.addListener("transitionEnd", updateBannerVisibility);

    return () => {
      navigation.removeListener("transitionEnd", updateBannerVisibility);
    };
  }, [isAdFree]);

  return isAdFree ? null : (
    <BaseCard title="Ad" testID="adCardBase" {...props}>
      {showAd ? (
        <AppodealMrec
          style={{
            height: 250,
            width: "100%",
            alignContent: "stretch",
            alignSelf: "center",
          }}
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
