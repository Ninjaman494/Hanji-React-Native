import { AppBar, HonorificSwitch } from "components";
import Select from "components/Select";
import useConjugations from "hooks/useConjugations";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, ScrollView, View } from "react-native";
import { ProgressBar, useTheme } from "react-native-paper";
import ConjugationsList from "./ConjugationsList";

const stems = [
  { label: "먹다", value: "먹다" },
  { label: "먹드다", value: "먹드다" },
];

const pos = [
  { label: "Verb", value: "Verb" },
  { label: "Adjective", value: "Adjective" },
];

const regularity = [
  { label: "Regular Verb/Adjective", value: "regular" },
  { label: "Irregular Verb/Adjective", value: "irregular" },
];

interface FormValues {
  stem: string;
  isAdj: boolean;
  regular: boolean;
  honorific: boolean;
}

const ConjugatorPage: FC = () => {
  const { padding, colors } = useTheme();

  const [formValues, setFormValues] = useState<FormValues>({
    stem: "먹다",
    isAdj: false,
    regular: false,
    honorific: false,
  });

  const { data, loading } = useConjugations(formValues);

  // For switch, Apollo doesn't reset loading when fetching from cache
  const [animate, setAnimate] = useState(false);

  // Value used for transition animations on container
  const containerY = useRef(new Animated.Value(0)).current;
  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  useEffect(() => {
    if (animate || (!loading && data?.conjugations)) {
      Animated.timing(containerY, {
        toValue: 100,
        duration: 500,
        easing: Easing.bezier(0.645, 0.045, 0.355, 1.0),
        useNativeDriver: false,
      }).start();

      setAnimate(false);
    }
  }, [animate, loading, data]);

  const updateForm = useCallback(
    (formValues: FormValues) => {
      setFormValues(formValues);
      setAnimate(true);
      containerY.setValue(0);
    },
    [formValues, containerY, setFormValues, setAnimate]
  );

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Conjugator" />
      <HonorificSwitch
        honorific={formValues.honorific}
        onPress={(value) => updateForm({ ...formValues, honorific: value })}
      />
      <ScrollView>
        <View
          style={{
            marginHorizontal: padding.horizontal,
            marginTop: padding.vertical,
          }}
        >
          <Select
            label="Possible Stems"
            list={stems}
            value={formValues.stem}
            inputProps={{ style: { marginBottom: -16 } }}
            onChange={(value) =>
              updateForm({
                ...formValues,
                stem: value,
              })
            }
          />
          <Select
            label="Part of Speech"
            list={pos}
            value={formValues.isAdj ? "Adjective" : "Verb"}
            inputProps={{ style: { marginBottom: -16 } }}
            onChange={(value) =>
              updateForm({
                ...formValues,
                isAdj: value === "Adjective",
              })
            }
          />
          <Select
            label="Regularity"
            list={regularity}
            value={formValues.regular ? "regular" : "irregular"}
            inputProps={{ style: { marginBottom: -16 } }}
            onChange={(value) =>
              updateForm({
                ...formValues,
                regular: value === "regular",
              })
            }
          />
        </View>
        {data?.conjugations ? (
          <ConjugationsList
            conjugations={data.conjugations}
            style={{
              transform: [{ translateY: containerTranslate }],
            }}
          />
        ) : (
          <ProgressBar
            color={colors.accent}
            style={{ marginHorizontal: padding.horizontal, marginTop: 32 }}
            indeterminate
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ConjugatorPage;
