import * as React from "react";

import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import BaseScreen from "../../common/screens/base-screen";

import { useNavigation } from "@react-navigation/native";
import UsuarioForm from "../../common/screens/usuario-form";
import { LoginContext } from "../../contexts/login/login-context";

function Login() {
  const navigation = useNavigation();
  const loginContext = React.useContext(LoginContext);

  const formInputs = (): JSX.Element => {
    return (
      <>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="usuário"
          value={loginContext?.usuario?.username}
          onChange={(event) => {
            event.preventDefault();

            loginContext?.setUsuario({
              ...loginContext.usuario,
              username: event.nativeEvent.text
            });
          }}
        />
        <TextInput
          style={styles.input}
          keyboardType="visible-password"
          placeholder="senha"
          value={loginContext?.usuario?.password}
          onChange={(event) => {
            event.preventDefault();

            loginContext?.setUsuario({
              ...loginContext.usuario,
              password: event.nativeEvent.text
            });
          }}
        />
      </>
    );
  };

  const formFooter = (): JSX.Element => {
    return (
      <>
        <TouchableOpacity>
          <Text
            style={styles.botao_entrar}
            onPress={() => loginContext?.login()}
          >
            Entrar
          </Text>
        </TouchableOpacity>
        <View style={styles.criar_conta}>
          <Text style={styles.texto_criar_conta}>
            Não possuo uma conta ainda,{" "}
          </Text>
          <TouchableOpacity>
            <Text
              style={styles.botao_criar_conta}
              onPress={() => navigation.navigate("Cadastrar")}
            >
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <BaseScreen>
      <UsuarioForm
        titulo="Login"
        usuarioFormInputs={formInputs()}
        formFooter={formFooter()}
      />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    width: "100%",
    fontFamily: "Courier Prime",
    lineHeight: 24,
    fontSize: 16,
    marginTop: 32,
    paddingVertical: 16
  },
  botao_entrar: {
    marginTop: 24,
    color: "white",
    backgroundColor: "black",
    padding: 16,
    fontFamily: "Courier Prime",
    lineHeight: 24,
    fontSize: 16
  },
  criar_conta: {
    flexDirection: "row"
  },
  texto_criar_conta: {
    marginTop: 24,
    color: "black",
    fontFamily: "Courier Prime",
    lineHeight: 24,
    fontSize: 16
  },
  botao_criar_conta: {
    marginTop: 24,
    color: "green",
    fontFamily: "Courier Prime",
    lineHeight: 24,
    fontSize: 16
  },
  erro: {
    color: "red",
    marginVertical: 16,
    fontFamily: "Courier Prime",
    lineHeight: 24,
    fontSize: 16
  }
});

export default Login;
