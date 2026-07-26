import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.authService.validarSesion().subscribe({
      error: () => {
        // El AuthService cambia estaAutenticado a false.
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout().subscribe({
      next: result => {
        if (!result.correct) {
          console.error(
            result.errorMessage ??
            'No fue posible cerrar la sesión.'
          );

          return;
        }

        this.router.navigate(['/']);
      },
      error: error => {
        /*
         * Aunque el backend falle, limpiamos el estado visual
         * para no dejar el navbar mostrando opciones privadas.
         */
        this.authService.marcarSesionCerrada();
        this.router.navigate(['/']);

        console.error(
          'Ocurrió un error al cerrar la sesión:',
          error
        );
      }
    });
  }
}