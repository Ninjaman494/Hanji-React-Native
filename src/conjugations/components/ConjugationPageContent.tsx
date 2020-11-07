import { Conjugation } from "../../hooks/useConjugations";
import React from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useTheme } from "react-native-paper";
import ConjugationCard from "./ConjugationCard";

export interface ConjugationPageContentProps {
  conjugations: Conjugation[];
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

interface ConjugationMap {
  [key: string]: Conjugation[];
}

const ConjugationsPageContent: React.FC<ConjugationPageContentProps> = ({
  conjugations,
  onScroll,
}) => {
  const { padding } = useTheme();
  const style = {
    marginVertical: padding?.vertical,
    marginHorizontal: padding?.horizontal,
  };

  const conjMap = conjugations.reduce((conjMap: ConjugationMap, value) => {
    const conjugations = conjMap[value.type];
    conjMap[value.type] = conjugations ? [...conjugations, value] : [value];
    return conjMap;
  }, {});

  return (
    <FlatList
      data={Object.keys(conjMap)}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item}
      scrollEventThrottle={1}
      onScroll={onScroll}
      renderItem={({ item }) => (
        <ConjugationCard
          title={item}
          conjugations={conjMap[item]}
          style={style}
        />
      )}
    />
  );
};

export default ConjugationsPageContent;
