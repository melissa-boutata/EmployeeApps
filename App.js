import { StatusBar } from "expo-status-bar";
import React from "react";
import Constants from "expo-constants";

import { StyleSheet, Text, View } from "react-native";
import MainStack from "./screens/Navigation/Stack.js";

export default function App() {
  return (
    <View style={styles.container}>
      <MainStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    marginTop: Constants.statusBarHeight,
  },
});
