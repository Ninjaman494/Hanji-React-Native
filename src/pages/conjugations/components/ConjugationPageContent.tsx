import { Conjugation } from "hooks/useConjugations";
import React from "react";
import { Animated, FlatListProps } from "react-native";
import { useTheme } from "react-native-paper";
import ConjugationCard from "./ConjugationCard";

export interface ConjugationPageContentProps
  extends Omit<
    Animated.AnimatedProps<FlatListProps<string>>,
    "data" | "renderItem"
  > {
  conjugations: Conjugation[];
}

interface ConjugationMap {
  [key: string]: Conjugation[];
}

const ConjugationsPageContent: React.FC<ConjugationPageContentProps> = ({
  conjugations,
  ...rest
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
    <Animated.FlatList
      data={Object.keys(conjMap)}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item}
      scrollEventThrottle={1}
      renderItem={({ item }) => (
        <ConjugationCard
          title={item}
          conjugations={conjMap[item]}
          style={style}
        />
      )}
      {...rest}
    />
  );
};

export default ConjugationsPageContent;
