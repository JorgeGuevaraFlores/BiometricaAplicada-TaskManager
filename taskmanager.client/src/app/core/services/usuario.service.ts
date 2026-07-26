import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../enviroments/environment';
import { Usuario } from '../models/usuario.model';
import { UsuarioRequest } from '../models/usuario-request.model';

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

  agregar(usuario: UsuarioRequest): Observable<Result<Usuario>> {
    const formData = new FormData();

    formData.append('nombre', usuario.nombre);
    formData.append('apellidoPaterno', usuario.apellidoPaterno);
    formData.append(
      'apellidoMaterno',
      usuario.apellidoMaterno ?? ''
    );
    formData.append(
      'correoElectronico',
      usuario.correoElectronico
    );
    formData.append('password', usuario.password);

    if (usuario.imagen) {
      formData.append(
        'imagen',
        usuario.imagen,
        usuario.imagen.name
      );
    }

    return this.http.post<Result<Usuario>>(
      `${this.apiUrl}/add`,
      formData,
      {
        withCredentials: true
      }
    );
  }

  obtenerPorId(idUsuario: string): Observable<Result<Usuario>> {
    return this.http.get<Result<Usuario>>(
      `${this.apiUrl}/GetById/${idUsuario}`,
      {
        withCredentials: true
      }
    );
  }

  update(
    idUsuario: string,
    usuario: UsuarioRequest
  ): Observable<Result<Usuario>> {
    const formData = new FormData();

    formData.append('idUsuario', idUsuario);
    formData.append('nombre', usuario.nombre);
    formData.append('apellidoPaterno', usuario.apellidoPaterno);
    formData.append(
      'apellidoMaterno',
      usuario.apellidoMaterno ?? ''
    );
    formData.append(
      'correoElectronico',
      usuario.correoElectronico
    );
    formData.append(
      'password',
      usuario.password ?? ''
    );

    if (usuario.imagen) {
      formData.append(
        'imagen',
        usuario.imagen,
        usuario.imagen.name
      );
    }

    return this.http.put<Result<Usuario>>(
      `${this.apiUrl}/Update`,
      formData,
      {
        withCredentials: true
      }
    );
  }

  delete(idUsuario: string): Observable<Result<null>> {
    return this.http.delete<Result<null>>(
      `${this.apiUrl}/Delete/${idUsuario}`,
      {
        withCredentials: true
      }
    );
  }

  updateEstatus(idUsuario: string, activo: boolean): Observable<Result<null>> {
    return this.http.patch<Result<null>>(
      `${this.apiUrl}/UpdateStatus/${idUsuario}/estatus?activo=${activo}`,
      null,
      {
        withCredentials: true
      }
    );
  }

}