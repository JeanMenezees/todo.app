import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FeedbackProps } from "./feedback-props";

export default function Feedback(props: FeedbackProps) {
  return (
    <View style={styles.feedback}>
      <Text style={styles.texto_botao}>{props.mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  feedback: {
    position: "absolute",
    width: "100%",
    marginHorizontal: 16,
    backgroundColor: "black",
    bottom: 16
  },
  texto_botao: {
    fontFamily: "Courier Prime",
    lineHeight: 24,
    fontSize: 16,
    backgroundColor: "black",
    color: "white",
    paddingHorizontal: 8,
    textAlign: "center",
    marginVertical: 8,
    marginRight: 8
  }
});
