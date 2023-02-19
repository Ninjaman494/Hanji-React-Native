import useUserContext from "hooks/useUserContext";
import { useLogPopupShown } from "logging/popupShown";
import { forwardRef, useMemo, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { Text } from "react-native-paper";
import Popover from "react-native-popover-view/dist/Popover";
import { PopupName } from "typings/popup";

interface HintTooltipProps
  extends Omit<Popover["props"], "isVisible" | "children"> {
  text: string;
  popupName: PopupName;
}

const HintTooltip = forwardRef<Popover, HintTooltipProps>(
  ({ text, popupName, ...rest }, ref) => {
    const { sessionCount, pageViews, popupOpens } = useUserContext();
    const logPopupShown = useLogPopupShown();

    const shouldShow = useMemo(() => {
      let show = false;
      switch (popupName) {
        case PopupName.CONJUGATIONS:
          show = pageViews.Display >= 3 && pageViews.Conjugations === 0;
          break;
        case PopupName.FAVORITES:
          show = sessionCount >= 5 && pageViews.Favorites === 0;
          break;
        case PopupName.CONJINFO:
          show = pageViews.Conjugations >= 2;
          break;
        default:
          return false;
      }

      return show && !popupOpens[popupName];
    }, [popupName, sessionCount, pageViews, popupOpens]);

    const [showPopup, setShowPopup] = useState(shouldShow);

    return (
      <Popover
        ref={ref}
        isVisible={showPopup}
        onOpenComplete={() => logPopupShown(popupName, true)}
        onRequestClose={() => setShowPopup(false)}
        backgroundStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
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
    );
  }
);

export default HintTooltip;
