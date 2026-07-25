import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/login-request.model';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mensajeError: string = '';
  mostrarPassword: boolean = false;

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.loginForm = this.formBuilder.group({
      correoElectronico: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.mensajeError = '';

    const loginRequest: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        if (response.correct) {
          this.authService.marcarSesionIniciada();
          this.router.navigate(['']);
          return;
        }

        this.mensajeError =
          response.errorMessage ??
          'No fue posible iniciar sesión.';
      },
      error: (error) => {
        this.mensajeError =
          error.error?.errorMessage ??
          'Ocurrió un error al iniciar sesión.';

        console.error('Error al iniciar sesión:', error);
      }
    });
  }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

}
