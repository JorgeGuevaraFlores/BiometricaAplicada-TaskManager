import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';

import { UsuarioService } from '../../../../core/services/usuario.service';
import { AlertaService } from '../../../../core/services/alerta.service';

import { UsuarioRequest } from '../../../../core/models/usuario-request.model';

@Component({
  selector: 'app-usuario-add',
  standalone: true,
  imports: [
    UsuarioFormComponent
  ],
  templateUrl: './usuario-add.component.html',
  styleUrl: './usuario-add.component.css'
})
export class UsuarioAddComponent {

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly alertaService: AlertaService,
    private readonly router: Router
  ) { }

  guardarUsuario(usuario: UsuarioRequest): void {
    this.usuarioService.agregar(usuario)
      .subscribe({
        next: async result => {
          if (result.correct) {
            await this.alertaService.exito(
              'Usuario registrado',
              'El usuario se registró correctamente.'
            );

            this.router.navigate(['/usuarios']);
            return;
          }

          await this.alertaService.error(
            'No fue posible registrar',
            result.errorMessage ??
            'Ocurrió un error al registrar el usuario.'
          );
        },

        error: async error => {
          console.error(error);

          await this.alertaService.error(
            'Error al registrar',
            error.error?.errorMessage ??
            'Ocurrió un error al registrar el usuario.'
          );
        }
      });
  }
}