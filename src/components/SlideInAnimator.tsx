import React, { FC, ReactNode } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
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

export interface SlideInTopProps extends Animated.ComponentProps<View> {
  shouldAnimate: boolean;
  showOnScroll?: boolean;
  extendedHeight?: number;
  includeOpacity?: boolean;
}

export interface SlideInScrollViewProps
  extends Animated.ComponentProps<ScrollView> {
  shouldAnimate: boolean;
}

export interface SlideInFlatListProps
  extends Animated.ComponentProps<FlatList> {
  shouldAnimate: boolean;
}

export const easeOutExpo = Easing.bezier(0.19, 1.0, 0.22, 1.0);

// Value that will be bound to scroll-y
const scrollY = new Animated.Value(150);
// Value used for transition animations on container
const containerY = new Animated.Value(0);

export const SlideInTop: FC<SlideInTopProps> = ({
  children,
  style,
  shouldAnimate,
  showOnScroll,
  ...rest
}) => {
  const history = useHistory();
  const extendedHeight = 150;

  const appBarHeight = (
    showOnScroll ? Animated.diffClamp(scrollY, 0, 40) : scrollY
  ).interpolate({
    inputRange: [0, extendedHeight],
    outputRange: [extendedHeight, 0],
    extrapolate: "clamp",
  });

  if (shouldAnimate) {
    Animated.timing(scrollY, {
      toValue: 0,
      duration: 500,
      easing: easeOutExpo,
      useNativeDriver: false,
    }).start();
  }

  // Reset animations on page leave
  history.listen(() => scrollY.setValue(150));

  return (
    <Animated.View
      style={[style, { height: appBarHeight, opacity: 1 }]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};

export const SlideInScrollView: FC<SlideInScrollViewProps> = ({
  children,
  style,
  shouldAnimate,
  ...rest
}) => {
  const history = useHistory();

  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  // Reset animations on page leave
  history.listen(() => containerY.setValue(0));

  if (shouldAnimate) {
    Animated.timing(containerY, {
      toValue: 100,
      duration: 500,
      easing: easeOutExpo,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Animated.ScrollView
      style={[style, { transform: [{ translateY: containerTranslate }] }]}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </Animated.ScrollView>
  );
};

export const SlideInFlatList: FC<SlideInFlatListProps> = ({
  children,
  style,
  shouldAnimate,
  ...rest
}) => {
  const history = useHistory();

  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  if (shouldAnimate) {
    Animated.timing(containerY, {
      toValue: 100,
      duration: 500,
      easing: easeOutExpo,
      useNativeDriver: false,
    }).start();
  }

  // Reset animations on page leave
  history.listen(() => containerY.setValue(0));

  return (
    <Animated.FlatList
      style={[style, { transform: [{ translateY: containerTranslate }] }]}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={1}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </Animated.FlatList>
  );
};
