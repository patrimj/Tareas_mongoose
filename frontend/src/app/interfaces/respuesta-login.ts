import { Usuario } from './usuario';

export interface RespuestaLogin {
    usu: Usuario | null;
    token: string;
}
