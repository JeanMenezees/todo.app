import * as React from "react";

import {
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View
} from "react-native";
import { UsuarioContext } from "../../../contexts/usuario/usuario-context";
import BaseScreen from "../base-screen";

import { UsuarioFormProps } from "./props";

function UsuarioForm(props: UsuarioFormProps) {
  const loginContext = React.useContext(UsuarioContext);

  return (
    <BaseScreen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <Text style={styles.titulo}>{props.titulo}</Text>
          {props.usuarioFormInputs}

          {loginContext?.erro ? (
            <Text style={styles.erro}>{loginContext.erro.mensagem}</Text>
          ) : null}

          {props.formFooter}
        </View>
      </KeyboardAvoidingView>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16
  },
  content: {
    width: "100%"
  },
  titulo: {
    fontFamily: "Courier Prime",
    lineHeight: 32,
    fontSize: 24
  },
  erro: {
    color: "red",
    marginVertical: 16,
    fontFamily: "Courier Prime",
    lineHeight: 24,
    fontSize: 16
  }
});

export default UsuarioForm;
