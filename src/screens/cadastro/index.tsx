import * as React from "react";

import { Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import BaseScreen from "../../common/screens/base-screen";

import { useNavigation } from "@react-navigation/native";
import UsuarioForm from "../../common/screens/usuario-form";
import {
  UsuarioContext,
  UsuarioFormScreenProps
} from "../../contexts/usuario/usuario-context";
import { Usuario } from "../../contexts/usuario/usuario-interface";

function Cadastrar() {
  const navigation = useNavigation<UsuarioFormScreenProps>();
  const contexto = React.useContext(UsuarioContext);

  const formInputs = (): JSX.Element => {
    return (
      <>
        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="username"
          value={contexto?.usuario?.username}
          onChange={(event) => {
            const usuario = contexto?.usuario as Usuario;

            contexto?.setUsuario({
              ...usuario,
              username: event.nativeEvent.text
            });
          }}
        />
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="email"
          value={contexto?.usuario?.email}
          onChange={(event) => {
            const usuario = contexto?.usuario as Usuario;

            contexto?.setUsuario({
              ...usuario,
              email: event.nativeEvent.text
            });
          }}
        />
        <TextInput
          style={styles.input}
          keyboardType="visible-password"
          placeholder="senha"
          value={contexto?.usuario?.password}
          onChange={(event) => {
            const usuario = contexto?.usuario as Usuario;

            contexto?.setUsuario({
              ...usuario,
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
        <TouchableOpacity
          disabled={contexto?.erro ? true : false}
          onPress={() => contexto?.registrar()}
        >
          <Text
            style={styles.botao_cadastrar}
          >
            Cadastrar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.voltar_login}
            onPress={() => {
              navigation.navigate("Login");
            }}
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
