import { AppBar, LoadingScreen } from "components";
import useConjugations from "hooks/useConjugations";
import useGetURLParams from "hooks/useGetURLParams";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import ConjugationsPageContent from "./components/ConjugationPageContent";

const easeInOutCubic = Easing.bezier(0.645, 0.045, 0.355, 1.0);

// intial state - loading false, conjugations null
// First switch - loading true, conjugations not-null
// later switches - loading false, conjugations not-null

const ConjugationsPage: React.FC = () => {
  const { padding, colors, textSizes } = useTheme();

  const styles = StyleSheet.create({
    parent: {
      flex: 1,
    },
    switchBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: padding?.horizontal,
      paddingBottom: 8,
      backgroundColor: colors?.primary,
    },
    switchText: {
      fontSize: textSizes?.secondary,
      color: "white",
    },
  });

  const params = useGetURLParams();
  const stem = params.get("stem") as string;
  const isAdj = params.get("isAdj") === "true";

  const [honorific, setHonorific] = useState(
    params.get("honorific") === "true"
  );

  const { loading, error, data } = useConjugations({
    stem: stem,
    isAdj: isAdj,
    honorific: honorific,
  });
  const conjugations = data?.conjugations;

  // For switch, Apollo doesn't reset loading when fetching from cache
  const [animate, setAnimate] = useState(false);

  // Value used for transition animations on container
  const containerY = useRef(new Animated.Value(0)).current;

  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  useEffect(() => {
    if (animate || (!loading && conjugations)) {
      Animated.timing(containerY, {
        toValue: 100,
        duration: 500,
        easing: easeInOutCubic,
        useNativeDriver: false,
      }).start();

      setAnimate(false);
    }
  }, [animate, loading, conjugations]);

  return (
    <View style={styles.parent}>
      <AppBar title="Conjugations" />
      <View style={styles.switchBar}>
        <Text style={styles.switchText}>
          {honorific ? "Honorific" : "Regular"} Forms
        </Text>
        <Switch
          value={honorific}
          thumbColor="white"
          trackColor={{ false: colors?.primaryDark, true: "#FFFFFF88" }}
          onValueChange={() => {
            setHonorific(!honorific);
            setAnimate(true);
            containerY.setValue(0);
          }}
        />
      </View>
      {error && <Text>{error}</Text>}
      {conjugations ? (
        <ConjugationsPageContent
          conjugations={conjugations}
          style={{
            transform: [{ translateY: containerTranslate }],
            height: 500,
          }}
        />
      ) : (
        <LoadingScreen text="Loading" />
      )}
    </View>
  );
};

export default ConjugationsPage;
