import React, { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { withFormikControl, withFormikControlProps } from "react-native-formik";
import { Checkbox, Text } from "react-native-paper";
import { compose } from "recompose";

export type FormikCheckboxGroupProps = ViewProps & {
  options: { value: string; label: string }[];
  name: string;
  value?: Set<string>;
};

const FormikCheckboxGroup: FC<
  FormikCheckboxGroupProps & withFormikControlProps
> = ({ options, value, setFieldTouched, setFieldValue, style, ...rest }) => {
  const onPress = (checkValue: string) => {
    if (value.has(checkValue)) {
      value.delete(checkValue);
      setFieldValue(value);
    } else {
      value.add(checkValue);
      setFieldValue(value);
    }
    setFieldTouched();
  };

  return (
    <View {...rest}>
      {options.map(({ value: checkValue, label }) => (
        <View style={[styles.root, style]}>
          <Checkbox.Android
            accessibilityLabel={label}
            status={value.has(checkValue) ? "checked" : "unchecked"}
            onPress={() => onPress(checkValue)}
          />
          <Text style={styles.text}>{label}</Text>
        </View>
      ))}
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

export default compose<
  FormikCheckboxGroupProps & withFormikControlProps,
  FormikCheckboxGroupProps
>(withFormikControl)(FormikCheckboxGroup);
