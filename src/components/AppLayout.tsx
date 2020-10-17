import React from "react";
import { useTheme, Text } from "react-native-paper";
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import AppBar, { APP_BAR_HEIGHT, AppBarProps } from "./AppBar";
import LoadingScreen from "./LoadingScreen";

export interface AppLayoutProps extends AppBarProps {
  loading?: boolean;
  error?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  loading,
  error,
  children,
}) => {
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
    <View style={{ flex: 1, height: 500 }}>
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
      {loading ? (
        <LoadingScreen text="Loading" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
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
      )}
    </View>
  );
};

const style = StyleSheet.create({
  scrollView: {
    marginTop:
      APP_BAR_HEIGHT + (StatusBar.currentHeight ? StatusBar.currentHeight : 0),
    flexGrow: 1,
    paddingBottom: 8,
  },
});

export default AppLayout;
