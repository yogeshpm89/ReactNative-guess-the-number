import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../constants/colors";

const Input = (props) => {
  return (
    <TextInput
      {...props}
      style={{ ...styles.input, ...props.style }}></TextInput>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: colors.borderColor,
    borderWidth: 1,
    margin: 10,
    paddingLeft: 5
  }
});

export default Input;
