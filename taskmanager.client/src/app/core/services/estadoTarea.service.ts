import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Result } from '../models/result.model';
import { EstadoTarea } from '../models/estadoTarea.model';

import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoTareaService {

  private readonly apiUrl = `${environment.apiUrl}/EstadoTarea`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Result<EstadoTarea>> {
    return this.http.get<Result<EstadoTarea>>(
      `${this.apiUrl}/GetAll`,
      {
        withCredentials: true
      }
    );
  }
}
