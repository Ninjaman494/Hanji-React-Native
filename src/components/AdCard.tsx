import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import React from "react";
import "react-native";
import { AppodealBanner } from "react-native-appodeal";
import BaseCard, { BaseCardProps } from "./BaseCard";

export interface AdCardProps extends BaseCardProps {
  adUnitID: string;
}

const AdCard = ({ adUnitID, ...rest }: AdCardProps): JSX.Element | null => {
  const { isAdFree } = useGetAdFreeStatus();

  return (
    <BaseCard title="Ad" testID="adCardBase" {...rest}>
      <AppodealBanner
        style={{
          height: 250,
          width: "100%",
          backgroundColor: "hsl(0, 0%, 97%)",
          alignContent: "stretch",
          alignSelf: "center",
        }}
        adSize="mrec"
        usesSmartSizing // (iOS specific) on Android smart banners are enabled by default.
        onAdFailedToLoad={(e: any) => console.log("APPODEAL ERROR", e)}
      />
    </BaseCard>
  );
};

export default AdCard;
