import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Colors from '../constants/Color'

// Linear Gradient Background
const Container = ({ children }) => {
  return (
    <LinearGradient
      colors={Colors.BACKGROUND_COLOR}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
});

export default Container;
