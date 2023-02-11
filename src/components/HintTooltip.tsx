import { FC } from "react";
import { Platform, StatusBar } from "react-native";
import { Text } from "react-native-paper";
import Tooltip, { TooltipProps } from "react-native-walkthrough-tooltip";

interface HintTooltipProps extends TooltipProps {
  text: string;
}

const HintTooltip: FC<HintTooltipProps> = ({ text, ...rest }) => {
  return (
    <Tooltip
      disableShadow
      useInteractionManager
      placement="top"
      backgroundColor="rgba(0,0,0,0)"
      content={<Text>{text}</Text>}
      arrowSize={{ width: 24, height: 12 }}
      contentStyle={{
        backgroundColor: "#F3F5FE",
        elevation: 4,
      }}
      tooltipStyle={{
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      arrowStyle={{
        elevation: 4,
        shadowColor: "#FFFFFF",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      topAdjustment={
        Platform.OS === "android" ? -(StatusBar.currentHeight ?? 0) : 0
      }
      {...rest}
    />
  );
};

export default HintTooltip;
