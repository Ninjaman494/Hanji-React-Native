import { useFormikContext } from "formik";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import {
  HelperText,
  Menu,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { FormikContext } from "typings/utils";

export type FormikSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  inputProps?: ComponentProps<typeof TextInput>;
  style?: StyleProp<ViewStyle>;
  list: Array<{
    label: string;
    value: string;
  }>;
};

// Based on react-native-paper-dropdown
const FormikSelect: FC<FormikSelectProps> = ({
  name,
  inputProps,
  list,
  label,
  hint,
  style,
  ...rest
}) => {
  const { colors } = useTheme();

  const {
    values,
    errors,
    touched,
    handleBlur,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext<FormikContext>();
  const value = values[name];
  const error = touched[name] ? errors[name] : null;

  const [showDropdown, setShowDropdown] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  };

  useEffect(() => {
    const itemLabel = list.find((item) => item.value === value)?.label;
    if (itemLabel) {
      setDisplayValue(itemLabel);
    }
  }, [list, value]);

  return (
    <Menu
      {...rest}
      visible={showDropdown}
      onDismiss={() => {
        setShowDropdown(false);
        setFieldTouched(name);
      }}
      anchor={
        <TouchableRipple
          style={[style, { marginBottom: 8 }]}
          onLayout={onLayout}
          onBlur={handleBlur(name)}
          onPress={() => setShowDropdown(true)}
        >
          <View pointerEvents={"none"}>
            <TextInput
              value={displayValue}
              mode="outlined"
              label={label}
              accessibilityLabel={label}
              error={!!error}
              onBlur={handleBlur(name)}
              onFocus={() => setShowDropdown(true)}
              {...inputProps}
            />
            <HelperText
              type={error ? "error" : "info"}
              visible={!!error || !!hint}
            >
              {error ?? hint}
            </HelperText>
          </View>
        </TouchableRipple>
      }
      style={{
        maxWidth: inputLayout?.width,
        width: inputLayout?.width,
      }}
    >
      <ScrollView style={{ maxHeight: 200 }}>
        {list.map((item, index) => (
          <Menu.Item
            key={index}
            titleStyle={{
              color: value === item.value ? colors.primary : colors.text,
            }}
            onPress={() => {
              setFieldValue(name, item.value);
              setShowDropdown(false);
            }}
            title={item.label}
            style={{ maxWidth: inputLayout?.width }}
          />
        ))}
      </ScrollView>
    </Menu>
  );
};

export default FormikSelect;
