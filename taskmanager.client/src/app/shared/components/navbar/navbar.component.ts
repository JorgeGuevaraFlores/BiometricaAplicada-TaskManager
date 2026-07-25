import { Component, OnInit } from '@angular/core';
import {
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
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.validarSesion().subscribe({
      error: () => {
        // El AuthService ya cambia estaAutenticado a false.
      }
    });
  }
}