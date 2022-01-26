import React from "react";
import { View, StyleSheet, Text } from "react-native";

function Community({ item }) {
  return (
    <View style={styles.rectangle}>
      <View style={styles.wireHomeListTitle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: 375,
    height: 320,
    backgroundColor: "rgb(240, 240, 240)",
  },
  wireHomeListTitle: {
    width: 375,
    height: 20,
  },
  invalidName: {
    width: 120,
    height: 18,
    fontFamily: "NanumSquareOTFEB",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(34, 34, 34)",
  },
});

export default Community;
