import React, { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { Menu, TouchableRipple, TextInput, useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

export type FormikSelectProps = {
  visible: boolean;
  onDismiss: () => void;
  showDropDown: () => void;
  value: string | number | undefined;
  setValue: (value: string | number) => void;
  label?: string | undefined;
  placeholder?: string | undefined;
  inputProps?: ComponentProps<typeof TextInput>;
  list: Array<{
    label: string;
    value: string | number;
  }>;
};

const FormikSelect: FC<FormikSelectProps> = ({ showDropDown, ...rest }) => {
  const ref = useRef();

  return (
    <DropDown
      inputProps={{ ref }}
      showDropDown={() => {
        showDropDown();
        ref.current?.focus();
      }}
      mode="outlined"
      {...rest}
    />
  );
};

export default FormikSelect;
