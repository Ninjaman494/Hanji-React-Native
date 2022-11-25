import { useFormikContext } from "formik";
import React, { forwardRef } from "react";
import { StyleSheet, Switch as ReactNativeSwitch, View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { FormikContext } from "typings/utils";

export type FormikSwitchProps = {
  name: string;
  label: string;
};

const FormikSwitch = forwardRef<ReactNativeSwitch, FormikSwitchProps>(
  ({ name, label }, ref) => {
    const { values, setFieldTouched, setFieldValue } =
      useFormikContext<FormikContext>();
    const value = values[name];

    return (
      <View style={styles.root} ref={ref}>
        <Text style={styles.text}>{label}</Text>
        <Switch
          accessibilityLabel={label}
          value={!!value}
          onValueChange={(v) => {
            setFieldValue(name, v);
            setFieldTouched(name);
          }}
        />
      </View>
    );
  }
);

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

export default FormikSwitch;
