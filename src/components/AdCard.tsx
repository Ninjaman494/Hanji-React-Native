import { AdMobBanner } from "expo-ads-admob";
import React from "react";
import "react-native";
import BaseCard, { BaseCardProps } from "./BaseCard";

export interface AdCardProps extends BaseCardProps {
  adUnitID: string;
}

const AdCard = ({ adUnitID, ...rest }: AdCardProps): JSX.Element => {
  return (
    <BaseCard title="Ad" {...rest}>
      <AdMobBanner
        bannerSize="mediumRectangle"
        adUnitID={adUnitID}
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
        style={{ alignSelf: "center" }}
      />
    </BaseCard>
  );
};

export default AdCard;
