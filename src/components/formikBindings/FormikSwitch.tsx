import React, { forwardRef } from "react";
import { StyleSheet, Switch as ReactNativeSwitch, View } from "react-native";
import {
  withFormikControl,
  withFormikControlProps,
  withNextInputAutoFocusInput,
} from "react-native-formik";
import { Switch, Text } from "react-native-paper";
import { compose } from "recompose";

export type FormikSwitchProps = {
  name: string;
  label: string;
};

const FormikSwitch = forwardRef<
  ReactNativeSwitch,
  FormikSwitchProps & withFormikControlProps
>(({ value, setFieldTouched, setFieldValue, ...rest }, ref) => {
  return (
    <View style={styles.root} ref={ref}>
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
});

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
