import React, { FC } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  ScrollView,
} from "react-native";
import useSlideUpAnimation from "./useSlideUpAnimation";

interface SlideInScrollView extends Animated.ComponentProps<ScrollView> {
  flatlist: false;
}

interface SlideInFlatList extends Animated.ComponentProps<FlatList> {
  flatlist: true;
}

export type SlideInBodyProps = (SlideInScrollView | SlideInFlatList) & {
  scrollY: Animated.Value;
  containerY: Animated.Value;
  shouldAnimate: boolean;
  minimumHeight?: number;
};

export const easeOutExpo = Easing.bezier(0.19, 1.0, 0.22, 1.0);

const SlideInBody: FC<SlideInBodyProps> = (props) => {
  const { containerY, scrollY, shouldAnimate, minimumHeight = 0 } = props;

  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, minimumHeight],
  });

  useSlideUpAnimation(containerY, shouldAnimate);

  const sharedProps = {
    style: [props.style, { transform: [{ translateY: containerTranslate }] }],
    onScroll: Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    ),
    scrollEventThrottle: 1,
    showsVerticalScrollIndicator: false,
  };

  if (props.flatlist) {
    return (
      <Animated.FlatList {...props} {...sharedProps}>
        {props.children}
      </Animated.FlatList>
    );
  } else {
    return (
      <Animated.ScrollView {...props} {...sharedProps}>
        {props.children}
      </Animated.ScrollView>
    );
  }
};

export default SlideInBody;
