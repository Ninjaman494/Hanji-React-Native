import { AppBar, FormikForm, FormikTextField } from "components";
import { Formik } from "formik";
import React, { FC } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useLocation } from "react-router-native";

const BugReportPage: FC = () => {
  const { padding, colors } = useTheme();
  const uri = useLocation<{ screenshot: string }>().state.screenshot;

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
  });

  return (
    <>
      <AppBar title="Report a Bug" />
      <ScrollView>
        <Formik initialValues={{ feedback: "", email: "" }} onSubmit={() => {}}>
          <FormikForm style={styles.form}>
            <FormikTextField name="feedback" label="Feedback" multiline />
            <FormikTextField name="email" label="Email (optional)" />
          </FormikForm>
        </Formik>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri }} />
          <Text style={styles.imageText}>
            The screenshot allows us to have more contextual information about
            your feedback
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default BugReportPage;
