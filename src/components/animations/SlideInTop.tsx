import { useFocusEffect } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import { Animated, View } from "react-native";
import { useTheme } from "react-native-paper";
import { easeOutExpo } from "./useSlideUpAnimation";

export interface SlideInTopProps extends Animated.ComponentProps<View> {
  scrollY: Animated.Value;
  shouldAnimate: boolean;
  showOnScroll?: boolean;
  extendedHeight?: number;
  includeOpacity?: boolean;
}

const SlideInTop: FC<SlideInTopProps> = ({
  children,
  style,
  scrollY,
  shouldAnimate,
  showOnScroll,
  extendedHeight = 150,
  ...rest
}) => {
  const { colors } = useTheme();

  const appBarHeight = (
    showOnScroll ? Animated.diffClamp(scrollY, 0, 40) : scrollY
  ).interpolate({
    inputRange: [0, extendedHeight],
    outputRange: [extendedHeight, 0],
    extrapolate: "clamp",
  });

  useFocusEffect(
    useCallback(() => {
      if (shouldAnimate) {
        Animated.timing(scrollY, {
          toValue: 0,
          duration: 500,
          easing: easeOutExpo,
          useNativeDriver: false,
        }).start();
      }

      return () => scrollY.setValue(150);
    }, [shouldAnimate])
  );

  return (
    <Animated.View
      style={[
        style ?? {
          position: "absolute",
          width: "100%",
          backgroundColor: colors.primary,
        },
        { height: appBarHeight, opacity: 1 },
      ]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};

export default SlideInTop;
