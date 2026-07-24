import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../enviroments/environment';
import { Usuario } from '../models/usuario.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = `${environment.apiUrl}/Usuario`;

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getAll(): Observable<Result<Usuario>> {
    return this.http.get<Result<Usuario>>(
      `${this.apiUrl}/getAll`,
      {
        withCredentials: true
      }
    );
  }
}