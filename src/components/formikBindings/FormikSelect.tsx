import React, { ComponentProps, forwardRef, useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
  TextInput as ReactNativeTextInput,
} from "react-native";
import {
  withFormikControl,
  withFormikControlProps,
  withNextInputAutoFocusInput,
} from "react-native-formik";
import {
  Menu,
  TouchableRipple,
  TextInput,
  useTheme,
  HelperText,
} from "react-native-paper";
import { compose } from "recompose";

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
const FormikSelect = forwardRef<
  ReactNativeTextInput,
  FormikSelectProps & withFormikControlProps
>(
  (
    {
      inputProps,
      list,
      label,
      hint,
      value,
      error,
      style,
      setFieldTouched,
      setFieldValue,
      ...rest
    },
    ref
  ) => {
    const { colors } = useTheme();

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
          setFieldTouched();
        }}
        anchor={
          <TouchableRipple
            style={[style, { marginBottom: 8 }]}
            onLayout={onLayout}
            onPress={() => setShowDropdown(true)}
          >
            <View pointerEvents={"none"}>
              <TextInput
                ref={ref} // Needed for nextInputAutoFocus
                value={displayValue}
                mode="outlined"
                label={label}
                accessibilityLabel={label}
                error={!!error}
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
                setFieldValue(item.value);
                setShowDropdown(false);
              }}
              title={item.label}
              style={{ maxWidth: inputLayout?.width }}
            />
          ))}
        </ScrollView>
      </Menu>
    );
  }
);

export default compose<
  FormikSelectProps & withFormikControlProps,
  FormikSelectProps
>(
  withFormikControl,
  withNextInputAutoFocusInput
)(FormikSelect);
