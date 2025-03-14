import useUserContext from "hooks/useUserContext";
import React from "react";
import "react-native";
import { AppodealMrec } from "react-native-appodeal";
import BaseCard, { BaseCardProps } from "./BaseCard";

export type AdCardProps = BaseCardProps;

const AdCard = ({ ...rest }: AdCardProps): JSX.Element | null => {
  const { isAdFree } = useUserContext();

  return isAdFree && !__DEV__ ? null : (
    <BaseCard title="Ad" testID="adCardBase" {...rest}>
      <AppodealMrec
        style={{
          height: 250,
          width: "100%",
          alignContent: "stretch",
          alignSelf: "center",
        }}
        onAdLoaded={() => console.log("[HANJI AD] Banner view did load")}
        onAdExpired={() => console.log("[HANJI AD] Banner view expired")}
        onAdClicked={() => console.log("[HANJI AD] Banner view is clicked")}
        onAdFailedToLoad={() =>
          console.log("[HANJI AD] Banner view failed to load")
        }
      />
    </BaseCard>
  );
};

export default AdCard;
