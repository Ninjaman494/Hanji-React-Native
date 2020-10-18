import React from "react";
import useGetURLParams from "../hooks/useGetURLParams";
import useConjugations from "../hooks/useConjugations";
import { View, Animated, StyleSheet } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import AppBar from "../components/AppBar";
import LoadingScreen from "../components/LoadingScreen";
import ConjugationsPageContent from "./components/ConjugationPageContent";

const ConjugationsPage: React.FC = () => {
  const { padding, colors, textSizes } = useTheme();

  const styles = StyleSheet.create({
    parent: {
      flex: 1,
      height: 500,
    },
    switchBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: padding?.horizontal,
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

  const [honorific, setHonorific] = React.useState(
    params.get("honorific") === "true"
  );

  const { loading, error, data } = useConjugations({
    stem: stem,
    isAdj: isAdj,
    honorific: honorific,
  });

  const conjugations = data?.conjugations;

  // Value that will be bound to scroll-y
  const scrollY = new Animated.Value(0);

  // Ranges is based on extend bar's height
  const extendedHeight = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [40, 0],
    extrapolate: "clamp",
  });
  const opacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.parent}>
      <AppBar title="Conjugations" />
      <Animated.View
        style={[styles.switchBar, { height: extendedHeight, opacity: opacity }]}
      >
        <Text style={styles.switchText}>
          {honorific ? "Honorific" : "Regular"} Forms
        </Text>
        <Switch
          value={honorific}
          thumbColor="white"
          trackColor={{ false: colors?.primaryDark, true: "#FFFFFF88" }}
          onValueChange={() => setHonorific(!honorific)}
          //@ts-ignore web-only attribute
          activeThumbColor="white"
        />
      </Animated.View>
      {loading && <LoadingScreen text="Loading" />}
      {error && <Text>{error}</Text>}
      {conjugations && (
        <ConjugationsPageContent
          conjugations={conjugations}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ])}
        />
      )}
    </View>
  );
};

export default ConjugationsPage;
