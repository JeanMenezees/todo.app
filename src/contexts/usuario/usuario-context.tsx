import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { Usuario } from "../../common/interfaces/usuario";
import { UsuarioFormParamRoute } from "./usuario-form-route-param";
import { UsuarioError } from "./error-type";
import { UsuarioContextType } from "./usuario-context-type";

export type UsuarioFormScreenProps = NativeStackNavigationProp<UsuarioFormParamRoute, 'Login'>;

export const UsuarioContext = React.createContext<UsuarioContextType | null>(null);

UsuarioContext.displayName = "Usuario";

const UsuarioProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [usuario, setUsuario] = React.useState<Usuario>();
  const [erro, setErro] = React.useState<UsuarioError | null>(null);

  const navigation = useNavigation<UsuarioFormScreenProps>();

  useEffect(() => {
    validarUsuario(usuario);
  }, [usuario]);

  const login = () => {
    if (usuario) {
      axios
        .post("http://192.168.1.5:3000/users/auth/login", usuario)
        .then(async (data) => {
          const token = await data.data.access_token;

          await AsyncStorage.setItem("token", token);

          navigation.navigate("Todos");
        })
        .catch((error) => Alert.alert("Usuário ou senha inválidos"));
    }
  };

  const validarUsuario = (usuario: Usuario | undefined) => {
    const erroResposta: UsuarioError = { mensagem: "Preencha todos os campos!" };

    if (!usuario) setErro(erroResposta);

    if (!usuario?.username || !usuario?.password) setErro(erroResposta);

    else setErro(null);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, erro, login }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioProvider;
