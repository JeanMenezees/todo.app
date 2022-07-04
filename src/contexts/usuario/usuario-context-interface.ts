import { Usuario } from "../../common/interfaces/usuario";
import { UsuarioError } from "./usuario-error-interface";

export interface UsuarioContextType {
    usuario: Usuario | undefined;
    setUsuario: React.Dispatch<React.SetStateAction<Usuario | undefined>>;
    erro: UsuarioError | null;
    login: () => void;
}