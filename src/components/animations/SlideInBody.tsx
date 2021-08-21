import React, { FC, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  ScrollView,
} from "react-native";

interface SlideInScrollView extends Animated.ComponentProps<ScrollView> {
  flatlist: false;
  scrollY: Animated.Value;
  containerY: Animated.Value;
  shouldAnimate: boolean;
}

interface SlideInFlatList extends Animated.ComponentProps<FlatList> {
  flatlist: true;
  scrollY: Animated.Value;
  containerY: Animated.Value;
  shouldAnimate: boolean;
}

export type SlideInBodyProps = SlideInScrollView | SlideInFlatList;

export const easeOutExpo = Easing.bezier(0.19, 1.0, 0.22, 1.0);

const SlideInBody: FC<SlideInBodyProps> = (props) => {
  const { containerY, scrollY, shouldAnimate } = props;

  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  useEffect(() => {
    if (shouldAnimate) {
      Animated.timing(containerY, {
        toValue: 100,
        duration: 500,
        easing: easeOutExpo,
        useNativeDriver: false,
      }).start();
    }

    return () => containerY.setValue(0);
  }, [shouldAnimate]);

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
