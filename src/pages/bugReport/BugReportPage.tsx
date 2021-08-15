import { ReactNativeFile } from "apollo-upload-client";
import { AppBar, FormikForm, FormikTextField } from "components";
import FormikCheckbox from "components/formikBindings/FormikCheckbox";
import FormikRadioGroup from "components/formikBindings/FormikRadioGroup";
import { Formik } from "formik";
import useSendBugReport, { ReportType } from "hooks/useSendBugReport";
import React, { FC } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useLocation } from "react-router-native";
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

const BugReportPage: FC = () => {
  const { padding, colors } = useTheme();
  const uri = useLocation<{ screenshot: string }>().state.screenshot;

  const [sendBugReport] = useSendBugReport();

  const styles = StyleSheet.create({
    form: {
      paddingHorizontal: padding.horizontal,
      paddingVertical: padding.vertical,
    },
    imageContainer: {
      flex: 1,
      flexDirection: "row",
      alignContent: "flex-start",
      marginHorizontal: padding.horizontal,
    },
    image: {
      flex: 1,
      height: 400,
      borderColor: colors.grey,
      borderWidth: 1,
      backgroundColor: colors.grey,
      resizeMode: "contain",
    },
    imageText: {
      flex: 1,
      marginStart: padding.horizontal,
    },
    button: {
      marginHorizontal: padding.horizontal,
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
    console.log("File", file);

    try {
      await sendBugReport({
        variables: {
          feedback: values.feedback,
          email: values.email,
          type: values.type,
          image: values.includeImage ? file : undefined,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar title="Report a Bug" />
      <ScrollView>
        <Formik<BugReportForm>
          initialValues={{
            feedback: "",
            email: "",
            type: typeOptions[0].value,
            includeImage: true,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, isSubmitting }) => (
            <>
              <FormikForm style={styles.form}>
                <FormikTextField name="feedback" label="Feedback" multiline />
                <FormikTextField name="email" label="Email (optional)" />
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
              </FormikForm>
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
