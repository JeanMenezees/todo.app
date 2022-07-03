import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { Usuario } from "../../common/interfaces/usuario";
import { LoginError } from "./error-type";
import { LoginContextType } from "./login-context-type";

export const LoginContext = React.createContext<LoginContextType | null>(null);

LoginContext.displayName = "Login";

const LoginProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [usuario, setUsuario] = React.useState<Usuario>();
  const [erro, setErro] = React.useState<LoginError | null>(null);

  const navigation = useNavigation();

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
        .catch((error) => console.log(error));
    }
  };

  const validarUsuario = (usuario: Usuario | undefined) => {
    const erroResposta: LoginError = { mensagem: "Preencha todos os campos!" };

    if (!usuario) {
      setErro(erroResposta);
    }

    if (!usuario?.username || !usuario?.password) {
      setErro(erroResposta);
    } else {
      setErro(null);
    }
  };

  return (
    <LoginContext.Provider value={{ usuario, setUsuario, erro, login }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
