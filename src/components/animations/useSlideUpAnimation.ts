import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Animated, Easing } from "react-native";

export const easeOutExpo = Easing.bezier(0.19, 1.0, 0.22, 1.0);

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
