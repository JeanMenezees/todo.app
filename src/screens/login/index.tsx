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
import {
  UsuarioContext,
  UsuarioFormScreenProps
} from "../../contexts/usuario/usuario-context";
import { Usuario } from "../../contexts/usuario/usuario-interface";

function Login() {
  const navigation = useNavigation<UsuarioFormScreenProps>();
  const usuarioContext = React.useContext(UsuarioContext);

  const formInputs = (): JSX.Element => {
    return (
      <>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="usuário"
          value={usuarioContext?.usuario?.username}
          onChange={(event) => {
            event.preventDefault();

            const usuario = usuarioContext?.usuario as Usuario;

            usuarioContext?.setUsuario({
              ...usuario,
              username: event.nativeEvent.text
            });
          }}
          onPressIn={() => usuarioContext?.setPrecisaValidar(true)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="senha"
          value={usuarioContext?.usuario?.password}
          onChange={(event) => {
            event.preventDefault();

            const usuario = usuarioContext?.usuario as Usuario;

            usuarioContext?.setUsuario({
              ...usuario,
              password: event.nativeEvent.text
            });
          }}
          onPressIn={() => usuarioContext?.setPrecisaValidar(true)}
        />
      </>
    );
  };

  const formFooter = (): JSX.Element => {
    return (
      <>
        <TouchableOpacity
          disabled={usuarioContext?.erro ? true : false}
          onPress={() => usuarioContext?.login()}
        >
          <Text style={styles.botao_entrar}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.criar_conta}>
          <Text style={styles.texto_criar_conta}>
            Não possuo uma conta ainda,{" "}
          </Text>
          <TouchableOpacity>
            <Text
              style={styles.botao_criar_conta}
              onPress={async () => {
                usuarioContext?.limparDados();

                navigation.navigate("Cadastrar");
              }}
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
