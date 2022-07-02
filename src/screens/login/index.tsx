import * as React from 'react';

import {
  Text, TextInput, KeyboardAvoidingView, StyleSheet, Platform, View, TouchableOpacity,
} from 'react-native';
import BaseScreen from '../base-screen';

function Login() {
  return (
    <BaseScreen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <Text style={styles.titulo}>Login</Text>
          <TextInput style={styles.input} keyboardType="default" placeholder="username" />
          <TextInput style={styles.input} keyboardType="visible-password" placeholder="senha" />
          <TouchableOpacity><Text style={styles.botao_entrar}>Entrar</Text></TouchableOpacity>
          <View style={styles.criar_conta}>
            <Text style={styles.texto_criar_conta}>Não possuo uma conta ainda, </Text>
            <TouchableOpacity><Text style={styles.botao_criar_conta}>Criar conta</Text></TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  content: {
    width: '100%',
  },
  titulo: {
    fontFamily: 'Courier Prime',
    lineHeight: 32,
    fontSize: 24,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '100%',
    fontFamily: 'Courier Prime',
    lineHeight: 24,
    fontSize: 16,
    marginTop: 32,
    paddingVertical: 16,
  },
  botao_entrar: {
    marginTop: 24,
    color: 'white',
    backgroundColor: 'black',
    padding: 16,
    fontFamily: 'Courier Prime',
    lineHeight: 24,
    fontSize: 16,
  },
  criar_conta: {
    flexDirection: 'row',
  },
  texto_criar_conta: {
    marginTop: 24,
    color: 'black',
    fontFamily: 'Courier Prime',
    lineHeight: 24,
    fontSize: 16,
  },
  botao_criar_conta: {
    marginTop: 24,
    color: 'green',
    fontFamily: 'Courier Prime',
    lineHeight: 24,
    fontSize: 16,
  },
});

export default Login;
