import HintTooltip from "components/HintTooltip";
import { Conjugation } from "hooks/useConjugations";
import React, { useState } from "react";
import { Animated, FlatListProps } from "react-native";
import { useTheme } from "react-native-paper";
import { Rect } from "react-native-popover-view";
import { PopupName } from "typings/popup";
import toTitleCase from "utils/toTitleCase";
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
  const [pos, setPos] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const { padding } = useTheme();
  const style = {
    marginVertical: padding.vertical,
    marginHorizontal: padding.horizontal,
  };

  const conjMap = conjugations.reduce((conjMap: ConjugationMap, value) => {
    const conjugations = conjMap[value.type];
    conjMap[value.type] = conjugations ? [...conjugations, value] : [value];
    return conjMap;
  }, {});

  return (
    <>
      <Animated.FlatList
        data={Object.keys(conjMap)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item}
        bounces={false}
        initialNumToRender={4}
        windowSize={5}
        renderItem={({ item, index }) => (
          <ConjugationCard
            onLayout={(e) => index == 0 && setPos(e.nativeEvent.layout)}
            title={toTitleCase(item)}
            conjugations={conjMap[item]}
            style={style}
          />
        )}
        {...rest}
      />
      {pos.width != 0 && (
        <HintTooltip
          popupName={PopupName.CONJINFO}
          text="Click a conjugation for more details!"
          offset={-16}
          from={new Rect(pos.x, pos.y, pos.width / 2, pos.height)}
        />
      )}
    </>
  );
};

export default ConjugationsPageContent;
