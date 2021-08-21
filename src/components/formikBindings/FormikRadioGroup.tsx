import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { withFormikControl, withFormikControlProps } from "react-native-formik";
import { Caption, RadioButton, Text, useTheme } from "react-native-paper";
import { compose } from "recompose";

export type FormikRadioGroup = ViewProps & {
  name: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

const FormikRadioGroup: FC<FormikRadioGroup & withFormikControlProps> = ({
  value,
  options,
  setFieldTouched,
  setFieldValue,
  ...rest
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    root: {
      margin: 0,
    },
    groupItem: {
      margin: 8,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      fontSize: 16,
      color: colors.grey,
    },
    text: {
      fontSize: 16,
    },
  });

  return (
    <View style={[styles.root, rest.style]}>
      <Text style={styles.label}>{rest.label}</Text>
      <RadioButton.Group
        onValueChange={(newValue) => {
          setFieldValue(newValue);
          setFieldTouched();
        }}
        value={value}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <View style={styles.groupItem} key={value}>
            <RadioButton.Android value={value} />
            <Text style={styles.text}>{label}</Text>
          </View>
        ))}
      </RadioButton.Group>
      {rest.error && (
        <Caption style={{ color: colors.error }}>{rest.error}</Caption>
      )}
    </View>
  );
};

export default compose<
  FormikRadioGroup & withFormikControlProps,
  FormikRadioGroup
>(withFormikControl)(FormikRadioGroup);
