import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioFormComponent } from '../../components/usuario-form/usuario-form.component';
import { UsuarioService } from '../../../../core/services/usuario.service';
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
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  private obtenerUsuario(): void {
    this.idUsuario =
      this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    if (!this.idUsuario) {
      alert('No se proporcionó un identificador de usuario.');

      this.router.navigate(['/usuarios']);
      return;
    }

    this.usuarioService.obtenerPorId(this.idUsuario)
      .subscribe({
        next: (result) => {
          if (result.correct && result.object) {
            this.usuario = result.object;
          } else {
            alert(result.errorMessage ?? 'Usuario no encontrado.');
            this.router.navigate(['/usuarios']);
          }

          this.cargando = false;
        },
        error: (error) => {
          console.error(error);

          alert('Ocurrió un error al consultar el usuario.');

          this.cargando = false;
          this.router.navigate(['/usuarios']);
        }
      });
  }

  actualizarUsuario(usuario: UsuarioRequest): void {
    console.log('Usuario por actualizar:', {
      idUsuario: this.idUsuario,
      ...usuario
    });
  }
}