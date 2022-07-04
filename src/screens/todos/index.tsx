import React, { useContext, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";
import Feedback from "../../common/components/feedback";
import BaseScreen from "../../common/screens/base-screen";
import { TodoContext } from "../../contexts/todo/todo-context";
import { Todo } from "../../contexts/todo/todo.interface";
import TodoItem from "./components/todo";

export function Todos() {
  const contexto = useContext(TodoContext);

  useEffect(() => {
    contexto?.obterTodos();
  }, []);

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.titulo}>Meus todo's</Text>
        <View>
          <Text style={styles.titulo}>Criar todo</Text>
          <TextInput
            style={styles.input}
            placeholder="titulo"
            value={contexto?.todo?.titulo}
            onChange={(event) => {
              const todo = contexto?.todo as Todo;

              contexto?.setTodo({ ...todo, titulo: event.nativeEvent.text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="descricao"
            value={contexto?.todo?.descricao}
            onChange={(event) => {
              const todo = contexto?.todo as Todo;

              contexto?.setTodo({ ...todo, descricao: event.nativeEvent.text });
            }}
          />
          <TouchableOpacity>
            <Text
              style={styles.texto_botao}
              onPress={() => contexto?.criarTodo()}
            >
              Criar
            </Text>
          </TouchableOpacity>
        </View>
        {contexto?.todosIsLoading ? (
          <View style={styles.carregando}>
            <Text style={styles.texto_carregando}>Carregando todos... 📦</Text>
          </View>
        ) : (
          <FlatList
            data={contexto?.todos}
            renderItem={({ item }) => (
              <TodoItem
                id={item.id}
                titulo={item.titulo}
                descricao={item.descricao}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
        {contexto?.feedBack ? (
          <Feedback mensagem={contexto.feedBack.mensagem} />
        ) : null}
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  titulo: {
    fontFamily: "Courier Prime",
    lineHeight: 32,
    fontSize: 24
  },
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
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    fontFamily: "Courier Prime",
    lineHeight: 16,
    fontSize: 16,
    marginTop: 32,
    paddingVertical: 8
  },
  texto_botao: {
    fontFamily: "Courier Prime",
    lineHeight: 16,
    fontSize: 16,
    backgroundColor: "black",
    color: "white",
    paddingHorizontal: 16,
    textAlign: "center",
    marginVertical: 8
  }
});
