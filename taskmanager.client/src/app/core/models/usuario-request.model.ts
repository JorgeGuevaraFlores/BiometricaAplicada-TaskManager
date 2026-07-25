export interface UsuarioRequest {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  correoElectronico: string;
  password: string;
}
