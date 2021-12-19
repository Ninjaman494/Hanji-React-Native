import { AppBar } from "components";
import useCreateSuggestion from "hooks/useCreateSuggestion";
import { useSnackbar } from "providers/SnackbarProvider";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, useTheme } from "react-native-paper";
import { ScreenProps } from "typings/navigation";
import SuggestionForm, { SuggestionFormValues } from "./SuggestionForm";

const SuggestionPage: FC<ScreenProps<"Suggestion">> = ({
  route,
  navigation,
}) => {
  const { entryId } = route.params;
  const [createSuggestion] = useCreateSuggestion();
  const { showSnackbar, showError } = useSnackbar();

  const { padding, textSizes } = useTheme();
  const styles = StyleSheet.create({
    formContainer: {
      marginHorizontal: padding.horizontal,
      marginTop: padding.vertical,
    },
    instructionText: {
      fontSize: textSizes.regular,
      marginBottom: 24,
    },
  });

  const onSubmit = async ({
    antonym,
    synonym,
    example,
  }: SuggestionFormValues) => {
    try {
      await createSuggestion({
        variables: {
          suggestion: {
            entryID: entryId,
            antonyms: antonym ? [antonym] : undefined,
            synonyms: synonym ? [synonym] : undefined,
            examples: example ? [example] : undefined,
          },
        },
      });

      showSnackbar("Thanks! Your suggestion has been sent for review.");
      navigation.goBack();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Add to Entry" />
      <KeyboardAwareScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.instructionText}>
            Enter at lease one addition. We'll review your suggestion and add it
            to this entry if it's a good fit.
          </Text>
          <SuggestionForm onSubmit={onSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SuggestionPage;
