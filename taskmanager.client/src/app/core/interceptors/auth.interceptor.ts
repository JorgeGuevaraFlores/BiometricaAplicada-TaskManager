import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);

  const requestConCredenciales = request.clone({
    withCredentials: true
  });

  return next(requestConCredenciales).pipe(
    catchError((error: HttpErrorResponse) => {
      const esValidacionSesion =
        request.url.includes('/ValidateSession');

      if (error.status === 401 && !esValidacionSesion) {
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};