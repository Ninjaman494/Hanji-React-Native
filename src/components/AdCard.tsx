import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import useGetAnimating from "hooks/useGetAnimating";
import React from "react";
import "react-native";
import { View } from "react-native";
import { AppodealBanner } from "react-native-appodeal";
import { Native } from "sentry-expo";
import BaseCard, { BaseCardProps } from "./BaseCard";

export interface AdCardProps extends BaseCardProps {
  adUnitID: string;
}

const AdCard = ({ adUnitID, ...rest }: AdCardProps): JSX.Element | null => {
  const { isAdFree } = useGetAdFreeStatus();
  const { isAnimating } = useGetAnimating();

  return isAdFree ? null : (
    <BaseCard title="Ad" testID="adCardBase" {...rest}>
      {!isAnimating ? (
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
          onAdFailedToLoad={(error: any) =>
            Native.captureException(error, { extra: { error } })
          }
        />
      ) : (
        <View style={{ height: 250 }} />
      )}
    </BaseCard>
  );
};

export default AdCard;
