import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TodoContext } from "../../../../contexts/todo/todo-context";
import { Todo } from "../../../../contexts/todo/todo.interface";
import { UsuarioFormParamRoute } from "../../../../contexts/usuario/usuario-form-route-param";
import TodoConcluido from "../concluido";

type TodoScreenProps = NativeStackNavigationProp<
  UsuarioFormParamRoute,
  "Todos"
>;

export default function TodoItem(todo: Todo) {
  const contexto = useContext(TodoContext);
  const navigation = useNavigation<TodoScreenProps>();

  const [concluido, setConcluido] = React.useState<boolean>(false);

  useEffect(() => {
    setConcluido(todo.completa);
  }, []);

  return concluido ? (
    <TodoConcluido
      id={todo.id}
      titulo={todo.titulo}
      descricao={todo.descricao}
      completa={todo.completa}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.titulo}>{todo.titulo}</Text>
      <Text style={styles.descricao}>{todo.descricao}</Text>
      <View style={styles.botoes}>
        <TouchableOpacity
          onPress={() => {
            contexto?.setTodoParaAtualizar(todo);

            navigation.navigate("AtualizarTodo");
          }}
        >
          <Text style={styles.texto_botao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            contexto
              ?.atualizarTodo(
                {
                  titulo: todo.titulo,
                  descricao: todo.descricao,
                  completa: true
                },
                todo.id
              )
              .then((data) => {
                contexto.obterTodos();
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
