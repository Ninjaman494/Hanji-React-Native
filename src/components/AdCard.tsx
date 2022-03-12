import { AdMobBanner } from "expo-ads-admob";
import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import React from "react";
import "react-native";
import handleAdError from "utils/handleAdError";
import BaseCard, { BaseCardProps } from "./BaseCard";

export interface AdCardProps extends BaseCardProps {
  adUnitID: string;
}

const AdCard = ({
  adUnitID,
  style,
  ...rest
}: AdCardProps): JSX.Element | null => {
  const { isAdFree } = useGetAdFreeStatus();

  return (
    <BaseCard
      title="Ad"
      style={[style, { display: !isAdFree ? "none" : undefined }]}
      {...rest}
    >
      <AdMobBanner
        bannerSize="mediumRectangle"
        adUnitID={adUnitID}
        onDidFailToReceiveAdWithError={handleAdError}
        style={{ alignSelf: "center" }}
      />
    </BaseCard>
  );
};

export default AdCard;
