import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";
import { ScreenOrientation } from "expo";

const StartScreen = (props) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const window = Dimensions.get("window");

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const onTextInputHandler = (text) => {
    text = text.replace(/[^0-9]/g, "");
    setEnteredValue(text);
  };

  const onReset = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const onConfirm = () => {
    const number = parseInt(enteredValue);
    if (isNaN(number) || number <= 0 || number > 99) {
      Alert.alert("Error !!!", "Number should be between 1 and 99", [
        { text: "OK", style: "default", onPress: onReset },
      ]);
      return;
    }
    setSelectedNumber(number);
    setEnteredValue("");
    setConfirmed(true);
    Keyboard.dismiss();
  };

  const onStart = () => {
    props.startGameHandler(selectedNumber);
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <View>
          <Text>You entered</Text>
          <NumberContainer>{selectedNumber}</NumberContainer>
          <MainButton onPress={() => onStart()}>Start game</MainButton>
        </View>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.StartScreen}>
            <Text style={styles.title}>Start a new Game {Platform.OS}</Text>
            <Card style={styles.inputContainer}>
              <Text>Select a number</Text>
              <Input
                keyboardType="number-pad"
                style={styles.input}
                value={enteredValue}
                onChangeText={onTextInputHandler}
                maxLength={2}></Input>
              <View style={styles.buttonsContainer}>
                <View style={{ width: buttonWidth }}>
                  <MainButton onPress={onConfirm}>Confirm</MainButton>
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    color={colors.accent}
                    onPress={onReset}></Button>
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  StartScreen: {
    flex: 1,
    width: "100%",
    padding: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  title: {
    color: "red",
    fontSize: 20,
  },
  inputContainer: {
    padding: 30,
    width: "80%",
    maxWidth: "95%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    textAlign: "center",
  },
  buttonsContainer: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    width: Dimensions.get("window").width / 4,
  },
  summaryContainer: {
    padding: 50,
    alignItems: "center",
  },
});

export default StartScreen;
