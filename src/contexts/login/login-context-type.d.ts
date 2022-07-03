import { Usuario } from "../../common/interfaces/usuario";
import { LoginError } from "./error-type";

export interface LoginContextType {
    usuario: Usuario | undefined;
    setUsuario: React.Dispatch<React.SetStateAction<Usuario | undefined>>;
    erro: LoginError | null;
    login: () => void;
}