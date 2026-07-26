import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Usuario } from '../../../../core/models/usuario.model';

import { UsuarioService } from '../../../../core/services/usuario.service';
import { AlertaService } from '../../../../core/services/alerta.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly alertaService: AlertaService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: async result => {
        if (result.correct) {
          this.usuarios = result.objects ?? [];
          return;
        }

        await this.alertaService.error(
          'No fue posible consultar',
          result.errorMessage ??
          'No fue posible obtener los usuarios.'
        );
      },

      error: async error => {
        console.error(
          'Error al obtener los usuarios:',
          error
        );

        await this.alertaService.error(
          'Error al consultar',
          error.error?.errorMessage ??
          'Ocurrió un error al consultar los usuarios.'
        );
      }
    });
  }

  async eliminarUsuario(
    idUsuario: string
  ): Promise<void> {
    const confirmacion =
      await this.alertaService.confirmar(
        'Eliminar usuario',
        '¿Estás seguro de que deseas eliminar este usuario?',
        'Sí, eliminar',
        'Cancelar'
      );

    if (!confirmacion.isConfirmed) {
      return;
    }

    this.usuarioService.delete(idUsuario).subscribe({
      next: async result => {
        if (result.correct) {
          await this.alertaService.exito(
            'Usuario eliminado',
            'El usuario se eliminó correctamente.'
          );

          this.obtenerUsuarios();
          return;
        }

        await this.alertaService.error(
          'No fue posible eliminar',
          result.errorMessage ??
          'No fue posible eliminar el usuario.'
        );
      },

      error: async error => {
        console.error(
          'Error al eliminar el usuario:',
          error
        );

        await this.alertaService.error(
          'Error al eliminar',
          error.error?.errorMessage ??
          'Ocurrió un error al eliminar el usuario.'
        );
      }
    });
  }

  async cambiarEstatus(
    usuario: Usuario
  ): Promise<void> {
    const nuevoEstatus = !usuario.activo;

    const accion =
      nuevoEstatus
        ? 'activar'
        : 'desactivar';

    const confirmacion =
      await this.alertaService.confirmar(
        `${nuevoEstatus ? 'Activar' : 'Desactivar'} usuario`,
        `¿Estás seguro de que deseas ${accion} este usuario?`,
        `Sí, ${accion}`,
        'Cancelar'
      );

    if (!confirmacion.isConfirmed) {
      return;
    }

    this.usuarioService
      .updateEstatus(
        usuario.idUsuario,
        nuevoEstatus
      )
      .subscribe({
        next: async result => {
          if (result.correct) {
            usuario.activo = nuevoEstatus;

            await this.alertaService.exito(
              nuevoEstatus
                ? 'Usuario activado'
                : 'Usuario desactivado',
              nuevoEstatus
                ? 'El usuario se activó correctamente.'
                : 'El usuario se desactivó correctamente.'
            );

            return;
          }

          await this.alertaService.error(
            'No fue posible actualizar',
            result.errorMessage ??
            'No fue posible actualizar el estatus del usuario.'
          );
        },

        error: async error => {
          console.error(
            'Error al actualizar el estatus del usuario:',
            error
          );

          await this.alertaService.error(
            'Error al actualizar',
            error.error?.errorMessage ??
            'Ocurrió un error al actualizar el estatus del usuario.'
          );
        }
      });
  }
}