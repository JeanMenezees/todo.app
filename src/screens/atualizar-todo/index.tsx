import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackNavigatorProps
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { useContext } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import BaseScreen from "../../common/screens/base-screen";
import { TodoContext } from "../../contexts/todo/todo-context";
import { Todo } from "../../contexts/todo/todo.interface";
import { UsuarioFormParamRoute } from "../../contexts/usuario/usuario-form-route-param";

type AtualizarTodoScreenProps = NativeStackNavigationProp<
  UsuarioFormParamRoute,
  "AtualizarTodo"
>;

function AtualizarTodo() {
  const contexto = useContext(TodoContext);
  const navigation = useNavigation<AtualizarTodoScreenProps>();

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.titulo}>Atualizar todo</Text>
        <TextInput
          style={styles.input}
          placeholder="titulo"
          value={contexto?.todoParaAtualizar?.titulo}
          onChange={(event) => {
            contexto?.setTodoParaAtualizar({
              ...(contexto.todoParaAtualizar as Todo),
              titulo: event.nativeEvent.text
            });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="descricao"
          value={contexto?.todoParaAtualizar?.descricao}
          onChange={(event) => {
            contexto?.setTodoParaAtualizar({
              ...(contexto.todoParaAtualizar as Todo),
              descricao: event.nativeEvent.text
            });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            contexto
              ?.atualizarTodo(
                {
                  titulo: contexto?.todoParaAtualizar?.titulo as string,
                  descricao: contexto?.todoParaAtualizar?.descricao as string
                },
                contexto?.todoParaAtualizar?.id as number
              )
              .then((data) => {
                contexto.obterTodos();

                contexto.setTodoParaAtualizar(null);

                navigation.navigate("Todos");
              });
          }}
        >
          <Text style={styles.texto_botao}>Atualizar</Text>
        </TouchableOpacity>
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
    marginVertical: 16,
    paddingVertical: 16
  }
});

export default AtualizarTodo;
