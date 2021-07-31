import React, { useRef } from "react";
import { useTheme, Text } from "react-native-paper";
import { Animated, Easing, StatusBar, StyleSheet, View } from "react-native";
import AppBar, { APP_BAR_HEIGHT, AppBarProps } from "components/AppBar";
import LoadingScreen from "components/LoadingScreen";
import { useHistory } from "react-router";

export interface AppLayoutProps extends AppBarProps {
  loading?: boolean;
  error?: string;
}

export const easeOutExpo = Easing.bezier(0.19, 1.0, 0.22, 1.0);

const AppLayout: React.FC<AppLayoutProps> = ({
  title,
  loading,
  error,
  children,
}) => {
  const history = useHistory();

  const { colors } = useTheme();
  const style = StyleSheet.create({
    parent: { flex: 1, height: 500 },
    appBar: {
      position: "absolute",
      width: "100%",
      backgroundColor: colors.primary,
    },
    scrollView: {
      marginTop: APP_BAR_HEIGHT + (StatusBar.currentHeight ?? 0),
      flexGrow: 1,
      paddingBottom: 8,
    },
  });

  // Value that will be bound to scroll-y
  const scrollY = useRef(new Animated.Value(150)).current;
  // Value used for transition animations on container
  const containerY = useRef(new Animated.Value(0)).current;

  const appBarHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [150, 0],
    extrapolate: "clamp",
  });

  const containerTranslate = containerY.interpolate({
    inputRange: [0, 100],
    outputRange: ["100%", "0%"],
  });

  if (!loading && !error) {
    Animated.parallel([
      Animated.timing(scrollY, {
        toValue: 0,
        duration: 500,
        easing: easeOutExpo,
        useNativeDriver: false,
      }),
      Animated.timing(containerY, {
        toValue: 100,
        duration: 500,
        easing: easeOutExpo,
        useNativeDriver: false,
      }),
    ]).start();
  }

  // Reset animations on page leave
  history.listen(() => {
    scrollY.setValue(150);
    containerY.setValue(0);
  });

  return (
    <View style={style.parent}>
      <Animated.View style={[style.appBar, { height: appBarHeight }]}>
        <AppBar title={title} />
      </Animated.View>
      {loading ? (
        <LoadingScreen text="Loading" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Animated.ScrollView
          style={[
            style.scrollView,
            {
              transform: [{ translateY: containerTranslate }],
            },
          ]}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } },
          ])}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default AppLayout;
