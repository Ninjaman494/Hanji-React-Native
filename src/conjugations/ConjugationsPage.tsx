import React from "react";
import useGetURLParams from "../hooks/useGetURLParams";
import useConjugations, { Conjugation } from "../hooks/useConjugations";
import ConjugationCard from "../display/components/ConjugationCard";
import { FlatList, View, Animated, StyleSheet } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import AppBar from "../components/AppBar";
import LoadingScreen from "../components/LoadingScreen";

interface ConjugationMap {
  [key: string]: Conjugation[];
}

const ConjugationsPage: React.FC = () => {
  const { padding, colors, textSizes } = useTheme();

  const styles = StyleSheet.create({
    parent: {
      flex: 1,
      height: 500,
    },
    card: {
      marginVertical: padding?.vertical,
      marginHorizontal: padding?.horizontal,
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

  const conjMap = data?.conjugations
    ? data?.conjugations.reduce((conjMap: ConjugationMap, value) => {
        const conjugations = conjMap[value.type];
        conjMap[value.type] = conjugations ? [...conjugations, value] : [value];
        return conjMap;
      }, {})
    : {};

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
      {conjMap && (
        <FlatList
          data={Object.keys(conjMap)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ])}
          renderItem={({ item }) => (
            <ConjugationCard
              title={item}
              conjugations={conjMap[item]}
              style={styles.card}
            />
          )}
        />
      )}
    </View>
  );
};

export default ConjugationsPage;
