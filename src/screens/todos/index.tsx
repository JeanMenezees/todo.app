import React, { useContext, useEffect } from "react";

import { StyleSheet, Text, View } from "react-native";
import BaseScreen from "../../common/screens/base-screen";
import { TodoContext } from "../../contexts/todo/todo-context";

export function Todo() {
  const contexto = useContext(TodoContext);

  useEffect(() => {
    contexto?.obterTodos();
  }, []);

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.titulo}>Meus todo's</Text>
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titulo: {
    fontFamily: "Courier Prime",
    lineHeight: 32,
    fontSize: 24
  }
});
