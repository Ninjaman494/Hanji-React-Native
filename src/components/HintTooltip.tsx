import { FC, forwardRef, ReactNode } from "react";
import { Platform, StatusBar } from "react-native";
import { Text } from "react-native-paper";
import Popover from "react-native-popover-view/dist/Popover";
import { PopoverProps } from "react-native-popover-view/dist/Types";

interface HintTooltipProps extends PopoverProps {
  text: string;
  from?: ReactNode;
}

const HintTooltip: FC<HintTooltipProps> = forwardRef(
  ({ text, ...rest }, ref) => (
    <Popover
      ref={ref as any}
      backgroundStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
      offset={36}
      popoverStyle={{
        backgroundColor: "#F3F5FE",
        padding: 8,
        elevation: 4,
      }}
      displayAreaInsets={{ left: 10, right: 10, top: 50, bottom: 50 }}
      verticalOffset={
        Platform.OS === "android" ? -(StatusBar.currentHeight ?? 0) : 0
      }
      arrowSize={{ width: 24, height: 12 }}
      {...rest}
    >
      <Text style={{ fontWeight: "bold" }}>{text}</Text>
    </Popover>
  )
);

export default HintTooltip;
