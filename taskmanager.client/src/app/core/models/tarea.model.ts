export interface Tarea {
    idTarea: string;
    titulo: string;
    descripcion?: string;
    estadoTareaNombre: string;

    idPrioridadTarea: number;
    prioridadTareaNombre: string;
    // idUsuario: string;
    usuarioNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaCreacion: string;
    fechaActualizacion: string;
}