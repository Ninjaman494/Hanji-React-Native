import { AdMobBanner } from "expo-ads-admob";
import useGetAdFreeStatus from "hooks/useGetAdFreeStatus";
import React from "react";
import "react-native";
import { Native } from "sentry-expo";
import BaseCard, { BaseCardProps } from "./BaseCard";

export interface AdCardProps extends BaseCardProps {
  adUnitID: string;
}

const AdCard = ({ adUnitID, ...rest }: AdCardProps): JSX.Element | null => {
  const { isAdFree } = useGetAdFreeStatus();

  return isAdFree ? null : (
    <BaseCard title="Ad" {...rest}>
      <AdMobBanner
        bannerSize="mediumRectangle"
        adUnitID={adUnitID}
        onDidFailToReceiveAdWithError={(error) =>
          Native.captureException(error, { extra: { error } })
        }
        style={{ alignSelf: "center" }}
      />
    </BaseCard>
  );
};

export default AdCard;
