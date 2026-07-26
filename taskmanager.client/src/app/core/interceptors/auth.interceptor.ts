import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  catchError,
  switchMap,
  throwError
} from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  request,
  next
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requestConCredenciales = request.clone({
    withCredentials: true
  });

  return next(requestConCredenciales).pipe(
    catchError((error: HttpErrorResponse) => {
      const url = request.url.toLowerCase();

      const esLogin =
        url.includes('/login');

      const esRefreshToken =
        url.includes('/refreshtoken');

      const esLogout =
        url.includes('/logout');

      if (
        error.status !== 401 ||
        esLogin ||
        esRefreshToken ||
        esLogout
      ) {
        return throwError(() => error);
      }

      return authService.renovarToken().pipe(
        switchMap(resultado => {
          if (!resultado.correct) {
            authService.marcarSesionCerrada();

            return throwError(
              () => new Error(
                resultado.errorMessage ??
                'No fue posible renovar la sesión.'
              )
            );
          }

          authService.marcarSesionIniciada();

          const peticionReintentada: HttpRequest<unknown> =
            request.clone({
              withCredentials: true
            });

          return next(peticionReintentada);
        }),

        catchError(errorRefresh => {
          authService.marcarSesionCerrada();

          const esValidacionSesion =
            url.includes('/validatesession');

          if (!esValidacionSesion) {
            router.navigate(['/login']);
          }

          return throwError(() => errorRefresh);
        })
      );
    })
  );
};