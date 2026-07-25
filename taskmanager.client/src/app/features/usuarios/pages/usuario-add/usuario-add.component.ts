import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';
import { UsuarioService } from '../../../../core/services/usuario.service';

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
    private readonly router: Router
  ) { }

  guardarUsuario(usuario: UsuarioRequest): void {

    this.usuarioService.agregar(usuario)
      .subscribe({

        next: (result) => {

          if (result.correct) {

            alert('Usuario registrado correctamente.');

            this.router.navigate(['/usuarios']);

          } else {

            alert(result.errorMessage);

          }

        },

        error: (error) => {

          console.error(error);

          alert('Ocurrió un error al registrar el usuario.');

        }

      });

  }

}