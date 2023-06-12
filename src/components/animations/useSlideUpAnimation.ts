import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Animated } from "react-native";
import { easeOutExpo } from "./SlideInBody";

const useSlideUpAnimation = (value: Animated.Value, shouldAnimate = true) => {
  useFocusEffect(
    useCallback(() => {
      if (!shouldAnimate) return;

      Animated.timing(value, {
        toValue: 100,
        duration: 500,
        easing: easeOutExpo,
        useNativeDriver: false,
      }).start();

      return () => value.setValue(0);
    }, [shouldAnimate, value])
  );
};

export default useSlideUpAnimation;
