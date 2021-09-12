import { AppBar, LoadingScreen } from "components";
import { easeOutExpo } from "components/animations/SlideInBody";
import useConjugations from "hooks/useConjugations";
import useGetURLParams from "hooks/useGetURLParams";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import ConjugationsPageContent from "./components/ConjugationPageContent";

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

  const { loading, error, data } = useConjugations(
    {
      stem: stem,
      isAdj: isAdj,
      honorific: honorific,
    },
    { notifyOnNetworkStatusChange: true, fetchPolicy: "cache-and-network" }
  );
  const conjugations = data?.conjugations;

  // Value used for transition animations on container
  const containerY = useRef(new Animated.Value(0)).current;
  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  useEffect(() => {
    if (!loading && conjugations) {
      Animated.timing(containerY, {
        toValue: 100,
        duration: 500,
        easing: easeOutExpo,
        useNativeDriver: false,
      }).start();
    }
  }, [loading, conjugations]);

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
            containerY.setValue(0);
          }}
        />
      </View>
      {error && <Text>{error}</Text>}
      {loading ? (
        <LoadingScreen />
      ) : (
        <ConjugationsPageContent
          conjugations={conjugations ?? []}
          style={{
            transform: [{ translateY: containerTranslate }],
            height: 500,
          }}
        />
      )}
    </View>
  );
};

export default ConjugationsPage;
