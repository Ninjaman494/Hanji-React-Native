import { StackScreenProps } from "@react-navigation/stack";
import { AppBar, AppLayout } from "components";
import { SlideInBody, SlideInTop } from "components/animations";
import React, { useMemo } from "react";
import { Animated, View } from "react-native";
import { StackParamList } from "typings/navigation";
import ConjInfoCard from "./ConjInfoCard";

type ConjInfoPageProps = StackScreenProps<StackParamList, "ConjInfo">;

const ConjInfoPage: React.FC<ConjInfoPageProps> = ({ route }) => {
  const { conjugation } = route.params;

  const scrollY = useMemo(() => new Animated.Value(150), []);
  const containerY = useMemo(() => new Animated.Value(0), []);

  return (
    <View style={{ flex: 1 }}>
      <SlideInTop scrollY={scrollY} shouldAnimate>
        <AppBar />
      </SlideInTop>
      <AppLayout>
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
