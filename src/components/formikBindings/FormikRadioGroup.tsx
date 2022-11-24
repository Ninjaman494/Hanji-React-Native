import { useFormikContext } from "formik";
import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Caption, RadioButton, Text, useTheme } from "react-native-paper";
import { FormikContext } from "typings/utils";

export type FormikRadioGroupProps = ViewProps & {
  name: string;
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
};

const FormikRadioGroup: FC<FormikRadioGroupProps> = ({
  name,
  label,
  options,
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

  const { values, errors, touched, setFieldTouched, setFieldValue } =
    useFormikContext<FormikContext>();
  const value = values[name];
  const error = touched[name] ? errors[name] : null;

  return (
    <View style={[styles.root, rest.style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RadioButton.Group
        onValueChange={(newValue) => {
          setFieldValue(name, newValue);
          setFieldTouched(name);
        }}
        value={value as string}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <View style={styles.groupItem} key={value}>
            <RadioButton.Android value={value} />
            <Text style={styles.text}>{label}</Text>
          </View>
        ))}
      </RadioButton.Group>
      {error && <Caption style={{ color: colors.error }}>{error}</Caption>}
    </View>
  );
};

export default FormikRadioGroup;
