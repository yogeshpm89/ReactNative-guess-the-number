import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Button,
  ListView,
  ScrollView,
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { FontAwesome } from "@expo/vector-icons";
import { ScreenOrientation } from "expo";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min)) + min;
  if (random === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return random;
  }
};

const GameScreen = (props) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);

  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const { userChoice, onGameOver } = props;
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Dont lie", "that this wrong", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else if (direction === "greater") {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((pastGuesses) => [nextNumber, ...pastGuesses]);
  };
  return (
    <ScrollView>
      <View style={styles.gameScreen}>
        <Text>Opponent's guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonsContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <FontAwesome name="minus" />
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <FontAwesome name="plus" />
          </MainButton>
        </Card>
        <ScrollView>
          {pastGuesses.map((guess, index) => (
            <RenderListItem
              numberOfItem={pastGuesses.length - index}
              text={guess}></RenderListItem>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gameScreen: {
    padding: 50,
  },
  buttonsContainer: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  list: {
    flexDirection: "row",
    padding: 15,
    borderWidth: 1,
    backgroundColor: "grey",
    justifyContent: "space-between",
  },
});

const RenderListItem = (props) => {
  return (
    <View style={styles.list}>
      <Text>#{props.numberOfItem}</Text>
      <Text>{props.text}</Text>
    </View>
  );
};
export default GameScreen;
