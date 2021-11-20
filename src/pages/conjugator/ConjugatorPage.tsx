import { ApolloError } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppBar, HonorificSwitch, LoadingScreen } from "components";
import ErrorDialog from "components/ErrorDialog";
import Select from "components/Select";
import useConjugations from "hooks/useConjugations";
import useGetStems from "hooks/useGetStems";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Portal, ProgressBar, useTheme } from "react-native-paper";
import { StackParamList } from "typings/navigation";
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

type ConjugatorPageProps = NativeStackScreenProps<StackParamList, "Conjugator">;

const ConjugatorPage: FC<ConjugatorPageProps> = ({ route, navigation }) => {
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
  const { data: stems, error: stemsError } = useGetStems(term as string, {
    skip: !term,
  });

  const [formValues, setFormValues] = useState<FormValues>({
    stem: "",
    isAdj: false,
    regular: true,
    honorific: false,
  });

  const {
    data: conjugations,
    loading: conjLoading,
    error: conjError,
  } = useConjugations(formValues, {
    skip: !stems,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  // Value used for transition animations on container
  const containerY = useRef(new Animated.Value(0)).current;
  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: [Dimensions.get("window").height, 0],
  });

  useEffect(() => {
    if (!conjLoading) {
      Animated.timing(containerY, {
        toValue: 100,
        duration: 500,
        easing: Easing.bezier(0.645, 0.045, 0.355, 1.0),
        useNativeDriver: false,
      }).start();
    }
  }, [conjLoading]);

  useEffect(() => {
    if (stems?.stems) {
      setFormValues({ ...formValues, stem: stems.stems[0] });
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
          error={conjError ?? (stemsError as ApolloError)}
          onDismiss={navigation.goBack}
        />
      </Portal>
      {stems?.stems ? (
        <ScrollView>
          <View style={styles.formContainer}>
            <Select
              label="Possible Stems"
              list={stems.stems.map((stem) => ({
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
              conjugations={conjugations?.conjugations ?? []}
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
