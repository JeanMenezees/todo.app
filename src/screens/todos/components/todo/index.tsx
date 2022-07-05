import React, { useEffect } from "react";
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
import TodoConcluido from "./concluido";

export default function TodoItem(todo: Todo) {
  const contexto = useContext(TodoContext);

  const [concluido, setConcluido] = React.useState<boolean>(false);
  const [editar, setEditar] = React.useState<boolean>(false);

  const [todoItem, setTodoItem] = React.useState<Todo>({
    id: todo.id,
    titulo: todo.titulo,
    descricao: todo.descricao,
    completa: todo.completa
  });

  useEffect(() => {
    setConcluido(todoItem.completa);
  }, []);

  return concluido ? (
    <TodoConcluido
      id={todoItem.id}
      titulo={todoItem.titulo}
      descricao={todoItem.descricao}
      completa={todoItem.completa}
    />
  ) : editar ? (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="titulo"
        onChange={(event) => {
          console.log(event.nativeEvent.text);
          setTodoItem({ ...todoItem, titulo: event.nativeEvent.text });
        }}
        value={todoItem.titulo}
      />
      <TextInput
        style={styles.input}
        placeholder="descricao"
        onChange={(event) =>
          setTodoItem({ ...todoItem, descricao: event.nativeEvent.text })
        }
        value={todoItem.descricao}
      />
      <TouchableOpacity
        disabled={!todoItem.descricao || !todoItem.titulo}
        onPress={() =>
          contexto
            ?.atualizarTodo(
              { titulo: todoItem.titulo, descricao: todoItem.descricao },
              todoItem.id
            )
            .then((data) => setEditar(false))
        }
      >
        <Text style={styles.texto_botao}>Concluir</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.titulo}>{todoItem.titulo}</Text>
      <Text style={styles.descricao}>{todoItem.descricao}</Text>
      <View style={styles.botoes}>
        <TouchableOpacity onPress={() => setEditar(true)}>
          <Text style={styles.texto_botao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            contexto
              ?.atualizarTodo(
                {
                  titulo: todoItem.titulo,
                  descricao: todoItem.descricao,
                  completa: true
                },
                todo.id
              )
              .then((data) => {
                setConcluido(true);
              })
          }
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
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    fontFamily: "Courier Prime",
    lineHeight: 16,
    fontSize: 16,
    marginTop: 16,
    paddingVertical: 8
  }
});
