import { useFormikContext } from "formik";
import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { FormikContext } from "typings/utils";

export type FormikCheckbox = ViewProps & {
  name: string;
  label: string;
};

const FormikCheckbox: FC<FormikCheckbox> = ({
  name,
  label,
  style,
  ...rest
}) => {
  const { values, handleBlur, setFieldValue, setFieldTouched } = useFormikContext<FormikContext>();
  const value = values[name];

  return (
    <View style={[styles.root, style]} {...rest}>
      <Checkbox.Android
        accessibilityLabel={label}
        status={!!value ? "checked" : "unchecked"}
        onBlur={handleBlur(name)}
        onPress={() => {
          setFieldValue(name, !value);
          setFieldTouched(name);
        }}
      />
      <Text style={styles.text}>{label}</Text>
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

export default FormikCheckbox;
