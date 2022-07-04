import React from "react";
import { useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { TodoContext } from "../../../../contexts/todo/todo-context";
import { Todo } from "../../../../contexts/todo/todo.interface";

export default function TodoItem(todo: Todo) {
  const contexto = useContext(TodoContext);

  const [editar, setEditar] = React.useState<boolean>(false);

  const templateEditar = () => {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="titulo"
          value={contexto?.todo?.titulo}
          onChange={(event) => {
            const todo: Todo = contexto?.todo as Todo;

            contexto?.setTodo({ ...todo, titulo: event.nativeEvent.text });
          }}
        />
        <TextInput
          placeholder="descricao"
          value={contexto?.todo?.descricao}
          onChange={(event) => {
            const todo: Todo = contexto?.todo as Todo;

            contexto?.setTodo({ ...todo, descricao: event.nativeEvent.text });
          }}
        />
        <TouchableOpacity onPress={() => contexto?.atualizarTodo()}>
          <Text style={styles.texto_botao}>Concluir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return editar ? (
    templateEditar()
  ) : (
    <View style={styles.container}>
      <Text style={styles.titulo}>{todo.titulo}</Text>
      <Text style={styles.descricao}>{todo.descricao}</Text>
      <View style={styles.botoes}>
        <TouchableOpacity onPress={() => setEditar(true)}>
          <Text style={styles.texto_botao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const todoFinalizado: Todo = {
              id: todo.id,
              titulo: todo.titulo,
              descricao: todo.descricao,
              completo: true
            };

            contexto?.setTodo(todoFinalizado);
            contexto?.atualizarTodo();


            
          }}
        >
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
