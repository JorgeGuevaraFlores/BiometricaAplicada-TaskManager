import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Result } from '../models/result.model';
import { Tarea } from '../models/tarea.model';
import { TareaRequest } from '../models/tarea-request.model';

@Injectable({
    providedIn: 'root'
})
export class TareaService {

    private readonly apiUrl = 'https://localhost:7160/api/Tarea';

    constructor(private http: HttpClient) { }

    getAll(
        idPrioridadTarea?: number,
        idEstadoTarea?: number
    ): Observable<Result<Tarea>> {
        const parametros: string[] = [];

        if (idPrioridadTarea) {
            parametros.push(
                `idPrioridadTarea=${idPrioridadTarea}`
            );
        }

        if (idEstadoTarea) {
            parametros.push(
                `idEstadoTarea=${idEstadoTarea}`
            );
        }

        let url = `${this.apiUrl}/GetAll`;

        if (parametros.length > 0) {
            url += `?${parametros.join('&')}`;
        }

        return this.http.get<Result<Tarea>>(
            url,
            {
                withCredentials: true
            }
        );
    }

    add(tarea: TareaRequest): Observable<Result<null>> {
        return this.http.post<Result<null>>(
            `${this.apiUrl}/Add`,
            tarea,
            {
                withCredentials: true
            }
        );
    }

    delete(idTarea: string): Observable<Result<null>> {
        return this.http.delete<Result<null>>(
            `${this.apiUrl}/Delete/${idTarea}`
        );
    }
}