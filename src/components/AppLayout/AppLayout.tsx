import React from "react";
import { useTheme } from "react-native-paper";
import { Animated, ScrollView, StyleSheet } from "react-native";
import AppBar, { APP_BAR_HEIGHT, AppBarProps } from "./AppBar";

export interface AppLayoutProps extends AppBarProps {}

const style = StyleSheet.create({
  scrollView: { marginTop: APP_BAR_HEIGHT, flexGrow: 1 },
});

const AppLayout: React.FC<AppLayoutProps> = ({ title, children }) => {
  const { colors } = useTheme();

  // Value that will be bound to scroll-y
  const scrollY = new Animated.Value(0);

  // Range is based on extend bar's height
  const extendedHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [150, 0],
    extrapolate: "clamp",
  });

  return (
    <>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: "100%",
            backgroundColor: colors.primary,
          },
          { height: extendedHeight },
        ]}
      >
        <AppBar title={title} />
      </Animated.View>
      <ScrollView
        style={style.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        scrollEventThrottle={1}
      >
        {children}
      </ScrollView>
    </>
  );
};

export default AppLayout;
