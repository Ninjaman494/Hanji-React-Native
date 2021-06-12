import React, {
  ComponentProps,
  FC,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import {
  withFormikControl,
  withFormikControlProps,
  withNextInputAutoFocusInput,
} from "react-native-formik";
import { Menu, TouchableRipple, TextInput, useTheme } from "react-native-paper";
import { compose } from "recompose";

export type FormikSelectProps = {
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  inputProps?: ComponentProps<typeof TextInput>;
  list: Array<{
    label: string;
    value: string;
  }>;
};

// Based on react-native-paper-dropdown
const FormikSelect: FC<FormikSelectProps & withFormikControlProps> = forwardRef(
  (
    {
      inputProps,
      list,
      label,
      name,
      value,
      error,
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
        onDismiss={() => setShowDropdown(false)}
        anchor={
          <TouchableRipple
            onLayout={onLayout}
            onPress={() => {
              setShowDropdown(true);
              setFieldTouched();
            }}
          >
            <View pointerEvents={"none"}>
              <TextInput
                ref={ref as any} // Needed for nextInputAutoFocus
                value={displayValue}
                mode="outlined"
                label={label}
                error={!!error}
                onFocus={() => setShowDropdown(true)}
                {...inputProps}
              />
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

export default compose<any, FormikSelectProps>(
  withFormikControl,
  withNextInputAutoFocusInput
)(FormikSelect);
