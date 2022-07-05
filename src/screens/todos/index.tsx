import React, { useContext, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from "react-native";
import BaseScreen from "../../common/screens/base-screen";
import Carregamento from "../../common/screens/carregamento";
import { CriarTodoDTO } from "../../contexts/todo/commands/criar-todo-dto";
import { TodoContext } from "../../contexts/todo/todo-context";
import { Todo } from "../../contexts/todo/todo.interface";
import TodoItem from "./components/todo";

export function Todos() {
  const contexto = useContext(TodoContext);

  const [todo, setTodo] = React.useState<CriarTodoDTO | null>(null);
  
  useEffect(() => {
    contexto?.obterTodos();
  }, []);

  //TODO: verificar os atrasados

  return (
    <BaseScreen>
      <View style={styles.container}>
        {contexto?.todosIsLoading ? (
          <Carregamento />
        ) : (
          <FlatList
            data={contexto?.todos}
            renderItem={({ item }) => (
              <TodoItem
                id={item.id}
                titulo={item.titulo}
                descricao={item.descricao}
                completa={item.completa}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={
              <>
                <Text style={styles.titulo}>Meus todo's</Text>
                <View>
                  <Text style={styles.criar_titulo}>Criar todo</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="titulo"
                    value={todo?.titulo}
                    onChange={(event) =>
                      setTodo({
                        ...(todo as CriarTodoDTO),
                        titulo: event.nativeEvent.text
                      })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="descricao"
                    value={todo?.descricao}
                    onChange={(event) =>
                      setTodo({
                        ...(todo as CriarTodoDTO),
                        descricao: event.nativeEvent.text
                      })
                    }
                  />
                  <TouchableOpacity
                    disabled={
                      todo === null ||
                      todo?.titulo === undefined ||
                      todo?.descricao === undefined
                    }
                    onPress={() =>
                      contexto?.criarTodo(todo as CriarTodoDTO).then((data) => {
                        contexto.setTodos((antigo) => [
                          ...(antigo as Todo[]),
                          data as Todo
                        ]);

                        setTodo(null);
                      })
                    }
                  >
                    <Text style={styles.texto_botao}>Criar</Text>
                  </TouchableOpacity>
                </View>
              </>
            }
          />
        )}
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
    lineHeight: 40,
    fontSize: 32
  },
  criar_titulo: {
    fontFamily: "Courier Prime",
    lineHeight: 32,
    fontSize: 24,
    marginTop: 16
  },
  input: {
    borderBottomWidth: 1,
    width: "100%",
    fontFamily: "Courier Prime",
    lineHeight: 16,
    fontSize: 16,
    marginTop: 16,
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
    marginVertical: 8,
    paddingVertical: 16
  }
});
