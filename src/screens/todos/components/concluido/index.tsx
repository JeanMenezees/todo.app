import { Todo } from "../../../../contexts/todo/todo.interface";

import { View, Text, StyleSheet } from "react-native";

export default function TodoConcluido(todo: Todo) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{todo.titulo}</Text>
      <Text style={styles.descricao}>{todo.descricao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    marginVertical: 32,
    borderBottomWidth: 2,
    borderColor: "black"
  },
  titulo: {
    fontFamily: "Courier Prime",
    lineHeight: 32,
    fontSize: 24,
    textDecorationLine: "line-through"
  },
  descricao: {
    fontFamily: "Courier Prime",
    lineHeight: 32,
    fontSize: 24,
    textDecorationLine: "line-through"
  }
});
