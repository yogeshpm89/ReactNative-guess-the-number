import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.numberContainer}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberContainer: {
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center"
  },
  number: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default NumberContainer;
