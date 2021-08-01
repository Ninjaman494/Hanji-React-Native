import React from "react";
import useGetURLParams from "hooks/useGetURLParams";
import useConjugations from "hooks/useConjugations";
import { View, StyleSheet } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import { AppBar, LoadingScreen } from "components";
import ConjugationsPageContent from "./components/ConjugationPageContent";
import SlideInAnimator from "components/SlideInAnimator";

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

  return (
    <View style={styles.parent}>
      <AppBar title="Conjugations" />
      {loading && <LoadingScreen text="Loading" />}
      {error && <Text>{error}</Text>}
      {!!conjugations && !loading && (
        <SlideInAnimator
          shouldAnimate={!!conjugations && !loading}
          extendedHeight={40}
          topComponent={
            <>
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
            </>
          }
          topStyles={styles.switchBar}
          bottomComponent={(props) => (
            <ConjugationsPageContent {...props} conjugations={conjugations} />
          )}
          showOnScroll
          includeOpacity
        />
      )}
    </View>
  );
};

export default ConjugationsPage;
