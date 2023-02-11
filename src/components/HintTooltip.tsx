import { FC } from "react";
import { Platform, StatusBar } from "react-native";
import { Text } from "react-native-paper";
import Tooltip, { TooltipProps } from "react-native-walkthrough-tooltip";

interface HintTooltipProps extends TooltipProps {
  text: string;
}

const HintTooltip: FC<HintTooltipProps> = ({ text, ...rest }) => (
  <Tooltip
    disableShadow
    useInteractionManager
    placement="top"
    backgroundColor="rgba(0,0,0,0)"
    content={<Text style={{ fontWeight: "bold" }}>{text}</Text>}
    arrowSize={{ width: 24, height: 12 }}
    contentStyle={{ backgroundColor: "#F3F5FE" }}
    topAdjustment={
      Platform.OS === "android" ? -(StatusBar.currentHeight ?? 0) : 0
    }
    {...rest}
  />
);

export default HintTooltip;
