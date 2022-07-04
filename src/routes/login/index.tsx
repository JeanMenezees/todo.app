import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../screens/login";
import Cadastrar from "../../screens/cadastro";

import React, { ReactNode } from "react";
import { Todo } from "../../screens/todos";

const Stack = createNativeStackNavigator();

export default function RotaLogin() {
    return <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastrar" component={Cadastrar} />
        <Stack.Screen name="Todos" component={Todo} />
    </Stack.Navigator>
}