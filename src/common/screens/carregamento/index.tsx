import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Carregamento() {
  return (
    <View style={styles.carregando}>
      <Text style={styles.texto_carregando}>Carregando todos... 📦</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  texto_carregando: {
    fontFamily: "Courier Prime",
    lineHeight: 32,
    fontSize: 24,
    textAlign: "center"
  }
});
