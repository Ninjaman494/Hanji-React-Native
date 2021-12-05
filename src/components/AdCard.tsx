import { AdMobBanner } from "expo-ads-admob";
import React, { useEffect, useState } from "react";
import "react-native";
import Purchases from "react-native-purchases";
import BaseCard, { BaseCardProps } from "./BaseCard";

export interface AdCardProps extends BaseCardProps {
  adUnitID: string;
}

const AdCard = ({ adUnitID, ...rest }: AdCardProps): JSX.Element | null => {
  // Hide ad until we know user isn't ad-free
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    (async () => {
      const { entitlements } = await Purchases.getPurchaserInfo();
      setShowAd(!entitlements.active.ad_free_entitlement);
    })();
  }, [setShowAd]);

  return showAd ? (
    <BaseCard title="Ad" {...rest}>
      <AdMobBanner
        bannerSize="mediumRectangle"
        adUnitID={adUnitID}
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
        style={{ alignSelf: "center" }}
      />
    </BaseCard>
  ) : null;
};

export default AdCard;
