import React from "react";
import { StyleSheet, Text, Image, View, Button } from "react-native";
import colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

const GameOver = (props) => {
  const { startOver } = props;
  return (
    <View style={styles.gameOver}>
      <Card style={styles.card}>
        <Text style={styles.text}>Game over !!!</Text>
        <Text style={styles.text}>You selected {props.userNumber}</Text>
        <NumberContainer>{props.guessRounds}</NumberContainer>
        <Image
          style={styles.image}
          fadeDuration={2000}
          // source={require("../assets/images/success_hd.jpg")}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQoGXkppwgqNDPIFzSQVCSrEgRRmlsqNbZS8_ZemT-L_IDaYr89"
          }}
        />
        <MainButton onPress={startOver}>New game</MainButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  gameOver: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  card: {
    padding: 30
  },
  button: {
    backgroundColor: colors.primary
  },
  text: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold"
  },
  image: {
    width: "100%",
    height: "10%",
    borderRadius: 90,
    margin: 10
  }
});

export default GameOver;
