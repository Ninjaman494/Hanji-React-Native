import { ApolloError } from "@apollo/client";
import { AppBar, HonorificSwitch, LoadingScreen } from "components";
import { easeOutExpo } from "components/animations/SlideInBody";
import ErrorDialog from "components/ErrorDialog";
import useConjugations from "hooks/useConjugations";
import useGetURLParams from "hooks/useGetURLParams";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useHistory } from "react-router";
import ConjugationsPageContent from "./components/ConjugationPageContent";

const ConjugationsPage: React.FC = () => {
  const history = useHistory();

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
      <HonorificSwitch
        honorific={honorific}
        onPress={() => {
          setHonorific(!honorific);
          containerY.setValue(0);
        }}
      />
      {error ? (
        <ErrorDialog
          visible={!!error}
          error={error as ApolloError}
          onDismiss={history.goBack}
        />
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
