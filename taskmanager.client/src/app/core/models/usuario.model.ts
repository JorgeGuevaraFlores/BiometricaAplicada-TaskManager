export interface Usuario {
  idUsuario: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  correoElectronico: string;
  fechaCreacion: Date;
  activo: boolean;
}
