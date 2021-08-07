import React from "react";
import { useTheme, Text } from "react-native-paper";
import { Animated, StyleSheet, View } from "react-native";
import AppBar, { APP_BAR_HEIGHT, AppBarProps } from "components/AppBar";
import LoadingScreen from "components/LoadingScreen";
import SlideInAnimator from "./SlideInAnimator";

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
  const style = StyleSheet.create({
    parent: { flex: 1, height: 500 },
    appBar: {
      position: "absolute",
      width: "100%",
      backgroundColor: colors.primary,
    },
    scrollView: {
      marginTop: APP_BAR_HEIGHT,
      flexGrow: 1,
      paddingBottom: 8,
    },
  });

  return (
    <View style={style.parent}>
      {loading ? (
        <LoadingScreen text="Loading" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <SlideInAnimator
          shouldAnimate={!loading && !error}
          topComponent={<AppBar title={title} />}
          topStyles={style.appBar}
          bottomComponent={(props) => (
            <Animated.ScrollView {...props}>{children}</Animated.ScrollView>
          )}
          bottomStyles={style.scrollView}
        />
      )}
    </View>
  );
};

export default AppLayout;
