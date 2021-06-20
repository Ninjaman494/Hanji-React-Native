import React from "react";
import { FC } from "react";
import { View, StyleSheet } from "react-native";
import {
  withFormikControl,
  withFormikControlProps,
  withNextInputAutoFocusInput,
} from "react-native-formik";
import { Text, Switch } from "react-native-paper";
import { compose } from "recompose";

export type FormikSwitchProps = {
  name: string;
  label: string;
};

const FormikSwitch: FC<FormikSwitchProps & withFormikControlProps> = ({
  value,
  setFieldTouched,
  setFieldValue,
  ...rest
}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{rest.label}</Text>
      <Switch
        accessibilityLabel={rest.label}
        value={value as unknown as boolean}
        onValueChange={(v) => {
          setFieldValue(v as unknown as string);
          setFieldTouched();
        }}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    margin: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});

export default compose<
  FormikSwitchProps & withFormikControlProps,
  FormikSwitchProps
>(
  withFormikControl,
  withNextInputAutoFocusInput
)(FormikSwitch);
