import * as React from "react";

import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import BaseScreen from "../../common/screens/base-screen";

import { useNavigation } from "@react-navigation/native";
import UsuarioForm from "../../common/screens/usuario-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { Usuario } from "../../common/interfaces/usuario";

function Login() {
  const navigation = useNavigation();

  const [usuario, setUsuario] = useState<string>(" ");
  const [senha, setSenha] = useState<string>(" ");

  const [erro, setErro] = useState<string>();

  useEffect(() => {
    const formInvalido = !usuario || !senha;
    if(formInvalido) setErro("Preencha todos os campos!");
    else setErro('');
  }, [usuario, senha])

  const login = (usuario: string, senha: string) => {
    const formInvalido = !usuario || !senha || usuario === " " || senha === " ";

    if (formInvalido) {
      setErro("Preencha todos os campos!");
    } else {
      const usuarioDTO: Usuario = {
        username: usuario,
        password: senha
      };

      axios
        .post("http://192.168.1.5:3000/users/auth/login", usuarioDTO)
        .then((data) => navigation.navigate('Todos'))
        .catch((error) => Alert.alert("Usuário ou senha inválidos"));
    }
  };

  const formInputs = (): JSX.Element => {
    return (
      <>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="usuário"
          onChange={(event) => {
            event.preventDefault();

            setUsuario(event.nativeEvent.text);
          }}
        />
        <TextInput
          style={styles.input}
          keyboardType="visible-password"
          placeholder="senha"
          onChange={(event) => {
            event.preventDefault();

            setSenha(event.nativeEvent.text);
          }}
        />
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      </>
    );
  };

  const formFooter = (): JSX.Element => {
    return (
      <>
        <TouchableOpacity>
          <Text
            style={styles.botao_entrar}
            onPress={() => login(usuario, senha)}
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
    color: 'red',
    marginVertical: 16,
    fontFamily: 'Courier Prime',
    lineHeight: 24,
    fontSize: 16
  }
});

export default Login;
