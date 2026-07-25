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

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requestConCredenciales = request.clone({
    withCredentials: true
  });

  return next(requestConCredenciales).pipe(
    catchError((error: HttpErrorResponse) => {
      const esLogin =
        request.url.includes('/Login');

      const esRefreshToken =
        request.url.includes('/RefreshToken');

      const esValidacionSesion =
        request.url.includes('/ValidateSession');

      if (
        error.status !== 401 ||
        esLogin ||
        esRefreshToken
      ) {
        return throwError(() => error);
      }

      return authService.renovarToken().pipe(
        switchMap(resultado => {
          if (!resultado.correct) {
            authService.marcarSesionCerrada();

            if (!esValidacionSesion) {
              router.navigate(['/login']);
            }

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

          /*
           * ValidateSession también se usa en el Home/navbar.
           * Si no existe sesión, no queremos mandar automáticamente
           * al login desde una página pública.
           */
          if (!esValidacionSesion) {
            router.navigate(['/login']);
          }

          return throwError(() => errorRefresh);
        })
      );
    })
  );
};