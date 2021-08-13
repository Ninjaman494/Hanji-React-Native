import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { withFormikControl, withFormikControlProps } from "react-native-formik";
import { Checkbox, Text } from "react-native-paper";
import { compose } from "recompose";

export type FormikCheckbox = ViewProps & {
  name: string;
  label: string;
};

const FormikCheckbox: FC<FormikCheckbox & withFormikControlProps> = ({
  value,
  setFieldTouched,
  setFieldValue,
  ...rest
}) => {
  return (
    <View style={[styles.root, rest.style]}>
      <Checkbox.Android
        accessibilityLabel={rest.label}
        status={value ? "checked" : "unchecked"}
        onPress={() => {
          setFieldValue(!value as unknown as string);
          setFieldTouched();
        }}
      />
      <Text style={styles.text}>{rest.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default compose<FormikCheckbox & withFormikControlProps, FormikCheckbox>(
  withFormikControl
)(FormikCheckbox);
