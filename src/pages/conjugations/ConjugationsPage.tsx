import { AppBar, HonorificSwitch, LoadingScreen } from "components";
import { easeOutExpo } from "components/animations/SlideInBody";
import ErrorDialog from "components/ErrorDialog";
import HintTooltip from "components/HintTooltip";
import useConjugations from "hooks/useConjugations";
import { useLogHonorificToggled } from "logging/honorificToggled";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Rect } from "react-native-popover-view";
import { PageName, ScreenProps } from "typings/navigation";
import { PopupName } from "typings/popup";
import ConjugationsPageContent from "./components/ConjugationPageContent";

const ConjugationsPage: React.FC<ScreenProps<PageName.CONJUGATIONS>> = ({
  route,
  navigation,
}) => {
  const { stem, isAdj, honorific: initialHonorific } = route.params;
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
    { input: { stem, isAdj, honorific } },
    { notifyOnNetworkStatusChange: true, fetchPolicy: "cache-and-network" }
  );
  const conjugations = data?.getConjugations;

  // Value used for transition animations on container
  const containerY = useRef(new Animated.Value(0)).current;
  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  // Get position for honorific switch hint
  const [pos, setPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const logHonorificToggled = useLogHonorificToggled();

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
        onLayout={({ nativeEvent }) => setPos(nativeEvent.layout)}
        onPress={async () => {
          setHonorific(!honorific);
          containerY.setValue(0);
          await logHonorificToggled(true);
        }}
      />
      {pos.width != 0 && (
        <HintTooltip
          popupName={PopupName.HONORIFIC}
          text="Try switching to honorific forms!"
          from={new Rect(pos.x, pos.y, pos.width, pos.height)}
          offset={52}
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
