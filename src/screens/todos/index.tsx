import React, { useContext, useEffect } from "react";

import { StyleSheet, Text, View, FlatList } from "react-native";
import BaseScreen from "../../common/screens/base-screen";
import { TodoContext } from "../../contexts/todo/todo-context";
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
        {contexto?.todosIsLoading ? (
          <View style={styles.carregando}>
            <Text style={styles.texto_carregando}>Carregando todos... 📦</Text>
          </View>
        ) : (
          <FlatList
            data={contexto?.todos}
            renderItem={({ item }) => (
              <TodoItem titulo={item.titulo} descricao={item.descricao} />
            )}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : item.titulo
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
  }
});
