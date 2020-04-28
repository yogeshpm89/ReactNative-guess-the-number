import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 35,
    paddingBottom: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Header;
