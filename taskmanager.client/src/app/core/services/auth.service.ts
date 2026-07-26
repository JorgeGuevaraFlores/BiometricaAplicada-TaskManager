import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../enviroments/environment';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}/auth`;
  estaAutenticado = signal(false);

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<Result<LoginResponse>> {
    return this.http.post<Result<LoginResponse>>(
      `${this.apiUrl}/login`,
      loginRequest, {
      withCredentials: true
    }
    );
  }

  validarSesion(): Observable<Result<null>> {
    return this.http
      .get<Result<null>>(
        `${this.apiUrl}/ValidateSession`
      )
      .pipe(
        tap({
          next: (result) => {
            this.estaAutenticado.set(result.correct);
          },
          error: () => {
            this.estaAutenticado.set(false);
          }
        })
      );
  }

  marcarSesionIniciada(): void {
    this.estaAutenticado.set(true);
  }

  marcarSesionCerrada(): void {
    this.estaAutenticado.set(false);
  }

  renovarToken(): Observable<Result<null>> {
    return this.http.post<Result<null>>(
      `${this.apiUrl}/RefreshToken`,
      {}
    );
  }

  logout(): Observable<Result<null>> {
    return this.http.post<Result<null>>(
      `${this.apiUrl}/Logout`,
      {}
    ).pipe(
      tap({
        next: result => {
          if (result.correct) {
            this.marcarSesionCerrada();
          }
        },
        error: () => {
          this.marcarSesionCerrada();
        }
      })
    );
  }
}