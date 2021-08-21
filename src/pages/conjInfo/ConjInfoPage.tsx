import { AppBar, AppLayout } from "components";
import { SlideInBody, SlideInTop } from "components/animations";
import { Conjugation } from "hooks/useConjugations";
import React, { useMemo } from "react";
import { Animated, View } from "react-native";
import { useLocation } from "react-router-native";
import ConjInfoCard from "./ConjInfoCard";

const ConjInfoPage: React.FC = () => {
  const conjugation =
    useLocation<{ conjugation: Conjugation }>().state.conjugation;

  const scrollY = useMemo(() => new Animated.Value(150), []);
  const containerY = useMemo(() => new Animated.Value(0), []);

  return (
    <View style={{ flex: 1 }}>
      <SlideInTop scrollY={scrollY} shouldAnimate>
        <AppBar />
      </SlideInTop>
      <AppLayout error={conjugation ? undefined : "Something went wrong"}>
        <SlideInBody
          shouldAnimate
          scrollY={scrollY}
          containerY={containerY}
          flatlist={false}
        >
          <ConjInfoCard conjugation={conjugation} />
        </SlideInBody>
      </AppLayout>
    </View>
  );
};

export default ConjInfoPage;
