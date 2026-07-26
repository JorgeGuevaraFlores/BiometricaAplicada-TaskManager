import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';

import { UsuarioService } from '../../../../core/services/usuario.service';
import { AlertaService } from '../../../../core/services/alerta.service';

import { Usuario } from '../../../../core/models/usuario.model';
import { UsuarioRequest } from '../../../../core/models/usuario-request.model';

@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [
    UsuarioFormComponent
  ],
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.css'
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario | null = null;
  cargando = true;
  idUsuario = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly usuarioService: UsuarioService,
    private readonly alertaService: AlertaService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  private obtenerUsuario(): void {
    this.idUsuario =
      this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    if (!this.idUsuario) {
      this.alertaService.error(
        'Usuario no encontrado',
        'No se proporcionó un identificador de usuario válido.'
      ).then(() => {
        this.router.navigate(['/usuarios']);
      });

      return;
    }

    this.usuarioService.obtenerPorId(this.idUsuario)
      .subscribe({
        next: async result => {
          if (result.correct && result.object) {
            this.usuario = result.object;
            this.cargando = false;
            return;
          }

          this.cargando = false;

          await this.alertaService.error(
            'Usuario no encontrado',
            result.errorMessage ??
            'No fue posible obtener la información del usuario.'
          );

          this.router.navigate(['/usuarios']);
        },

        error: async error => {
          console.error(
            'Error al consultar el usuario:',
            error
          );

          this.cargando = false;

          await this.alertaService.error(
            'Error al consultar',
            error.error?.errorMessage ??
            'Ocurrió un error al consultar el usuario.'
          );

          this.router.navigate(['/usuarios']);
        }
      });
  }

  actualizarUsuario(
    usuarioRequest: UsuarioRequest
  ): void {
    if (!this.idUsuario) {
      return;
    }

    this.usuarioService.update(
      this.idUsuario,
      usuarioRequest
    ).subscribe({
      next: async result => {
        if (result.correct) {
          await this.alertaService.exito(
            'Usuario actualizado',
            'El usuario se actualizó correctamente.'
          );

          this.router.navigate(['/usuarios']);
          return;
        }

        await this.alertaService.error(
          'No fue posible actualizar',
          result.errorMessage ??
          'No fue posible actualizar el usuario.'
        );
      },

      error: async error => {
        console.error(
          'Error al actualizar el usuario:',
          error
        );

        await this.alertaService.error(
          'Error al actualizar',
          error.error?.errorMessage ??
          'Ocurrió un error al actualizar el usuario.'
        );
      }
    });
  }
}