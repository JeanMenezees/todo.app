import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../screens/login";
import Cadastrar from "../../screens/cadastro";

import React from "react";
import { Todos } from "../../screens/todos";
import UsuarioProvider from "../../contexts/usuario/usuario-context";
import TodoProvider from "../../contexts/todo/todo-context";

const Stack = createNativeStackNavigator();

export default function Root() {
  return (
    <UsuarioProvider>
      <TodoProvider>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastrar" component={Cadastrar} />
          <Stack.Screen name="Todos" component={Todos} />
        </Stack.Navigator>
      </TodoProvider>
    </UsuarioProvider>
  );
}
