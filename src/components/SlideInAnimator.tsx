import React, { FC, ReactNode, useRef } from "react";
import { Animated, Dimensions, Easing, ViewStyle } from "react-native";
import { useHistory } from "react-router";

export interface SlideInAnimatorProps {
  shouldAnimate: boolean;
  topComponent: ReactNode;
  bottomComponent: ReactNode;
  topStyles?: ViewStyle;
  bottomStyles?: ViewStyle;
  extendedHeight?: number;
  showOnScroll?: boolean;
  includeOpacity?: boolean;
}

export const easeOutExpo = Easing.bezier(0.19, 1.0, 0.22, 1.0);

const SlideInAnimator: FC<SlideInAnimatorProps> = ({
  shouldAnimate,
  topComponent,
  bottomComponent: BottomComponent,
  topStyles,
  bottomStyles,
  extendedHeight = 150,
  showOnScroll,
  includeOpacity,
}) => {
  const history = useHistory();

  // Value that will be bound to scroll-y
  const scrollY = useRef(new Animated.Value(150)).current;
  // Value used for transition animations on container
  const containerY = useRef(new Animated.Value(0)).current;

  const appBarHeight = (
    showOnScroll ? Animated.diffClamp(scrollY, 0, 40) : scrollY
  ).interpolate({
    inputRange: [0, extendedHeight],
    outputRange: [extendedHeight, 0],
    extrapolate: "clamp",
  });
  const opacity = (
    showOnScroll ? Animated.diffClamp(scrollY, 0, 40) : scrollY
  ).interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  if (shouldAnimate) {
    Animated.parallel([
      Animated.timing(scrollY, {
        toValue: 0,
        duration: 500,
        easing: easeOutExpo,
        useNativeDriver: false,
      }),
      Animated.timing(containerY, {
        toValue: 100,
        duration: 500,
        easing: easeOutExpo,
        useNativeDriver: false,
      }),
    ]).start();
  }

  // Reset animations on page leave
  history.listen(() => {
    scrollY.setValue(150);
    containerY.setValue(0);
  });

  return (
    <>
      <Animated.View
        style={[
          topStyles,
          { height: appBarHeight, opacity: includeOpacity ? opacity : 1 },
        ]}
      >
        {topComponent}
      </Animated.View>
      <Animated.ScrollView
        style={[
          bottomStyles,
          { transform: [{ translateY: containerTranslate }] },
        ]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
      >
        {BottomComponent}
      </Animated.ScrollView>
    </>
  );
};

export default SlideInAnimator;
