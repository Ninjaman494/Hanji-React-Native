import { ReactNativeFile } from "apollo-upload-client";
import {
  AppBar,
  FormikCheckbox,
  FormikRadioGroup,
  FormikTextField,
} from "components";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { Formik } from "formik";
import useSendBugReport, { ReportType } from "hooks/useSendBugReport";
import { useSnackbar } from "providers/SnackbarProvider";
import React, { FC } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { PageName, ScreenProps } from "typings/navigation";
import getUser from "utils/getUser";
import logEvent, { LOG_EVENT } from "utils/logEvent";
import * as yup from "yup";

interface BugReportForm {
  feedback: string;
  email?: string;
  type: ReportType;
  includeImage: boolean;
}

const validationSchema = yup.object().shape({
  feedback: yup.string().label("Feedback").required(),
  type: yup.string().label("Feedback Type").required(),
});

const BugReportPage: FC<ScreenProps<PageName.BUGREPORT>> = ({
  route,
  navigation,
}) => {
  const { padding, colors } = useTheme();
  const { screenshot: uri } = route.params;
  const { goBack } = navigation;

  const [sendBugReport] = useSendBugReport();
  const { showSnackbar, showError } = useSnackbar();

  const styles = StyleSheet.create({
    form: {
      paddingHorizontal: padding?.horizontal,
      paddingVertical: padding?.vertical,
    },
    imageContainer: {
      flex: 1,
      flexDirection: "row",
      alignContent: "flex-start",
      marginHorizontal: padding?.horizontal,
    },
    image: {
      flex: 1,
      height: 400,
      borderColor: colors?.grey,
      borderWidth: 1,
      backgroundColor: colors?.grey,
      resizeMode: "contain",
    },
    imageText: {
      flex: 1,
      marginStart: padding?.horizontal,
    },
    button: {
      marginHorizontal: padding?.horizontal,
      marginTop: 32,
      marginBottom: 16,
    },
  });

  const typeOptions = [
    {
      label: "Found a Bug",
      value: ReportType.BUG,
    },
    {
      label: "Suggesting a New Feature",
      value: ReportType.NEW_FEATURE,
    },
    {
      label: "Just Saying Hi",
      value: ReportType.OTHER,
    },
  ];

  const onSubmit = async (values: BugReportForm) => {
    const file = new ReactNativeFile({
      name: "screenshot.png",
      type: "image/png",
      uri,
    });

    const deviceInfo = {
      version: Constants.nativeAppVersion ?? "missing",
      brand: Device.brand ?? "missing",
      manufacturer: Device.manufacturer ?? "missing",
      model: Device.modelName ?? "missing",
      sdkVersion: Device.osVersion ?? "missing",
    };

    const user = getUser();
    try {
      await logEvent({ type: LOG_EVENT.REPORT_BUG, params: values });

      await sendBugReport({
        variables: {
          feedback: values.feedback,
          type: values.type,
          email: user?.id,
          image: values.includeImage ? file : undefined,
          deviceInfo,
        },
      });

      showSnackbar("Report sent. Thanks for the feedback!");
      goBack();
    } catch (error) {
      showError(error as Error);
    }
  };

  return (
    <>
      <AppBar title="Report a Bug" />
      <ScrollView>
        <Formik<BugReportForm>
          initialValues={{
            feedback: "",
            type: typeOptions[0].value,
            includeImage: true,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, isSubmitting, isValid, dirty }) => (
            <>
              <View style={styles.form}>
                <FormikTextField name="feedback" label="Feedback" multiline />
                <FormikRadioGroup
                  name="type"
                  label="Select Feeback Type"
                  options={typeOptions}
                />
                <FormikCheckbox
                  name="includeImage"
                  label="Include screenshot?"
                  style={{ margin: -8, marginTop: 8 }}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri }} />
                <Text style={styles.imageText}>
                  The screenshot allows us to have more contextual information
                  about your feedback
                </Text>
              </View>
              <Button
                onPress={handleSubmit}
                mode="contained"
                color={colors.accent}
                style={styles.button}
                loading={isSubmitting}
                disabled={!isValid || !dirty}
              >
                Submit
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default BugReportPage;
