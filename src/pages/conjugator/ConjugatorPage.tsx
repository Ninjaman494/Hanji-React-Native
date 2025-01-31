import { AppBar, HonorificSwitch, LoadingScreen } from "components";
import useSlideUpAnimation from "components/animations/useSlideUpAnimation";
import ErrorDialog from "components/ErrorDialog";
import Select from "components/Select";
import useConjugations from "hooks/useConjugations";
import useGetStems from "hooks/useGetStems";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Portal, ProgressBar, useTheme } from "react-native-paper";
import { PageName, ScreenProps } from "typings/navigation";
import ConjugationsList from "./ConjugationsList";

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

const ConjugatorPage: FC<ScreenProps<PageName.CONJUGATOR>> = ({
  route,
  navigation,
}) => {
  // Styling
  const { padding, colors } = useTheme();
  const styles = StyleSheet.create({
    formContainer: {
      marginHorizontal: padding.horizontal,
      marginTop: padding.vertical,
    },
    select: { marginBottom: -16 },
    progressBar: {
      marginHorizontal: padding.horizontal,
      marginTop: 32,
    },
  });

  const { term } = route.params;
  const { data, error: stemsError } = useGetStems(term as string, {
    skip: !term,
  });
  const stems = data?.stems;

  const [formValues, setFormValues] = useState<FormValues>({
    stem: "",
    isAdj: false,
    regular: true,
    honorific: false,
  });

  const {
    data: conjData,
    loading: conjLoading,
    error: conjError,
  } = useConjugations(
    { input: formValues },
    {
      skip: stems?.length === 0,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

  // Value used for transition animations on container
  const containerY = useRef(new Animated.Value(0)).current;
  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  useSlideUpAnimation(containerY, !conjLoading);

  useEffect(() => {
    if (stems && stems?.length > 0) {
      setFormValues({ ...formValues, stem: stems[0] });
    }
  }, [stems, setFormValues]);

  const updateForm = useCallback(
    (formValues: FormValues) => {
      setFormValues(formValues);
      containerY.setValue(0);
    },
    [containerY, setFormValues]
  );

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Conjugator" />
      <HonorificSwitch
        honorific={formValues.honorific}
        onPress={(value) => updateForm({ ...formValues, honorific: value })}
      />
      <Portal>
        <ErrorDialog
          visible={!!(conjError || stemsError)}
          error={conjError ?? stemsError}
          onDismiss={navigation.goBack}
        />
      </Portal>
      {stems ? (
        <ScrollView>
          <View style={styles.formContainer}>
            <Select
              label="Possible Stems"
              list={stems.map((stem) => ({
                label: stem,
                value: stem,
              }))}
              value={formValues.stem}
              inputProps={{ style: styles.select }}
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
              inputProps={{ style: styles.select }}
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
              inputProps={{ style: styles.select }}
              onChange={(value) =>
                updateForm({
                  ...formValues,
                  regular: value === "regular",
                })
              }
            />
          </View>
          {conjLoading ? (
            <ProgressBar
              color={colors.accent}
              style={styles.progressBar}
              indeterminate
            />
          ) : (
            <ConjugationsList
              conjugations={conjData?.getConjugations ?? []}
              style={{
                transform: [{ translateY: containerTranslate }],
              }}
            />
          )}
        </ScrollView>
      ) : (
        <LoadingScreen />
      )}
    </View>
  );
};

export default ConjugatorPage;
