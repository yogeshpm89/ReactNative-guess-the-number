import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import StartScreen from "./screens/StartGame";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  if (!isDataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsDataLoaded(true)}
        onError={(err) => console.log(err)}></AppLoading>
    );
  }
  const startGameHandler = (number) => {
    setUserNumber(number);
  };

  const onGameOver = (count) => {
    setGuessRounds(count);
  };

  const startOver = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  let content = <StartScreen startGameHandler={startGameHandler}></StartScreen>;
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={onGameOver}></GameScreen>
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        guessRounds={guessRounds}
        userNumber={userNumber}
        startOver={startOver}></GameOver>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Guess a number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
