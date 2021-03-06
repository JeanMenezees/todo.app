import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { Usuario } from "./usuario-interface";
import { UsuarioFormParamRoute } from "./usuario-form-route-param";
import { UsuarioError } from "./usuario-error-interface";
import { UsuarioContextType } from "./usuario-context-interface";
import { LoginUsuarioDTO } from "./commands/login-usuario-dto";
import { RegistrarUsuarioDTO } from "./commands/registrar-usuario-dto";

export type UsuarioFormScreenProps = NativeStackNavigationProp<
  UsuarioFormParamRoute,
  "Login"
>;

export const UsuarioContext = React.createContext<UsuarioContextType | null>(
  null
);

UsuarioContext.displayName = "Usuario";

const UsuarioProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [usuario, setUsuario] = React.useState<Usuario | undefined>(undefined);
  const [erro, setErro] = React.useState<UsuarioError | null>(null);

  const [precisaValidar, setPrecisaValidar] = React.useState<boolean>(false);

  const navigation = useNavigation<UsuarioFormScreenProps>();

  useEffect(() => {
    validarUsuario(usuario);
  }, [usuario]);

  const login = () => {
    if (usuario) {
      const loginUsuarioDTO: LoginUsuarioDTO = {
        username: usuario.username,
        password: usuario.password
      };

      axios
        .post("http://192.168.1.5:3000/users/auth/login", loginUsuarioDTO)
        .then(async (data) => {
          const token = await data.data.access_token;

          await AsyncStorage.setItem("token", token);

          await limparDados();

          navigation.navigate("Todos");
        })
        .catch((error) => Alert.alert("Usuário ou senha inválidos"));
    }
  };

  const registrar = () => {
    if (usuario) {
      const registrarUsuarioDTO: RegistrarUsuarioDTO = {
        nome: usuario.username,
        email: usuario.email,
        senha: usuario.password
      };

      axios
        .post("http://192.168.1.5:3000/users/register", registrarUsuarioDTO)
        .then(async (data) => {
          await limparDados();

          navigation.navigate("Login");
        })
        .catch((error) => console.log(error));
    }
  };

  const limparDados = async () => {
    setUsuario({ username: "", password: "", email: "" });
  };

  const validarUsuario = (usuario: Usuario | undefined) => {
    const erroResposta: UsuarioError = {
      mensagem: "Preencha todos os campos!"
    };

    if (!usuario && precisaValidar) setErro(erroResposta);

    if ((!usuario?.username || !usuario?.password) && precisaValidar)
      setErro(erroResposta);
    else setErro(null);
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
        erro,
        login,
        registrar,
        limparDados,
        setPrecisaValidar
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioProvider;
