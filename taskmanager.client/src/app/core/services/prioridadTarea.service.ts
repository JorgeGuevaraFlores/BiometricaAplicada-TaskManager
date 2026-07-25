import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Result } from '../models/result.model';
import { PrioridadTarea } from '../models/prioridadTarea.model';

import { environment } from '../../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class PrioridadTareaService {

  private readonly apiUrl = `${environment.apiUrl}/PrioridadTarea`;


  constructor(private http: HttpClient) { }

  getAll(): Observable<Result<PrioridadTarea>> {
    return this.http.get<Result<PrioridadTarea>>(
      `${this.apiUrl}/GetAll`,
      {
        withCredentials: true
      }
    );
  }
}
