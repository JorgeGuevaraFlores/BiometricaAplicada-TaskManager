export interface UsuarioRequest {
  idUsuario?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  correoElectronico: string;
  password: string;
}
