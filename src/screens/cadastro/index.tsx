import * as React from "react";

import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import BaseScreen from "../../common/screens/base-screen";

import { useNavigation } from "@react-navigation/native";
import UsuarioForm from "../../common/screens/usuario-form";

function Cadastrar() {
  const navigation = useNavigation();

  const formInputs = (): JSX.Element => {
    return (
      <>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="username"
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="email"
        />
        <TextInput
          style={styles.input}
          keyboardType="visible-password"
          placeholder="senha"
        />
      </>
    );
  };

  const formFooter = (): JSX.Element => {
    return (
      <>
        <TouchableOpacity>
          <Text style={styles.botao_cadastrar}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.voltar_login}
            onPress={() => navigation.navigate('Login')}
          >
            {"<-- "}Voltar para o login
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <BaseScreen>
      <UsuarioForm
        usuarioFormInputs={formInputs()}
        titulo="Cadastro"
        formFooter={formFooter()}
      />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: "100%",
    fontFamily: "Courier Prime",
    lineHeight: 24,
    fontSize: 16,
    marginTop: 32,
    paddingVertical: 16
  },
  botao_cadastrar: {
    marginTop: 24,
    color: "white",
    backgroundColor: "black",
    padding: 16,
    fontFamily: "Courier Prime",
    lineHeight: 24,
    fontSize: 16
  },
  voltar_login: {
    lineHeight: 24,
    fontSize: 16,
    fontFamily: "Courier Prime",
    paddingVertical: 16
  }
});

export default Cadastrar;
