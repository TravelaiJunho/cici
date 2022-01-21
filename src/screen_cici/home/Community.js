import React from "react";
import { View, StyleSheet, Text } from "react-native";

function Community({ item }) {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Community;
