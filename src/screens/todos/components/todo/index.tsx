import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "../../../../contexts/todo/todo.interface";

export default function TodoItem(todo: Todo) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{todo.titulo}</Text>
      <Text style={styles.descricao}>{todo.descricao}</Text>
      <View style={styles.botoes}>
        <TouchableOpacity>
          <Text style={styles.texto_botao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.texto_botao}>Finalizar</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24
  },
  descricao: {
    fontFamily: "Courier Prime",
    lineHeight: 32,
    fontSize: 24
  },
  botoes: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
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
