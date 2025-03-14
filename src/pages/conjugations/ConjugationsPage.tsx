import { AppBar, HonorificSwitch, LoadingScreen } from "components";
import useSlideUpAnimation from "components/animations/useSlideUpAnimation";
import ErrorDialog from "components/ErrorDialog";
import useConjugations from "hooks/useConjugations";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { PageName, ScreenProps } from "typings/navigation";
import ConjugationsPageContent from "./components/ConjugationPageContent";

const ConjugationsPage: React.FC<ScreenProps<PageName.CONJUGATIONS>> = ({
  route,
  navigation,
}) => {
  const {
    stem,
    isAdj,
    regular,
    honorific: initialHonorific,
    alwaysHonorific,
  } = route.params;
  const [honorific, setHonorific] = useState(initialHonorific);

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

  const { loading, error, data } = useConjugations(
    { input: { stem, isAdj, honorific, regular } },
    { notifyOnNetworkStatusChange: true, fetchPolicy: "cache-and-network" }
  );
  const conjugations = data?.getConjugations;

  // Value used for transition animations on container
  const containerY = useRef(new Animated.Value(0)).current;
  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  useSlideUpAnimation(containerY, !loading && !!conjugations);

  return (
    <View style={styles.parent}>
      <AppBar title="Conjugations" />
      {!alwaysHonorific && (
        <HonorificSwitch
          honorific={honorific}
          onPress={() => {
            setHonorific(!honorific);
            containerY.setValue(0);
          }}
        />
      )}
      {error ? (
        <ErrorDialog visible error={error} onDismiss={navigation.goBack} />
      ) : loading ? (
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
