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

    getAll(): Observable<Result<Tarea>> {
        return this.http.get<Result<Tarea>>(
            `${this.apiUrl}/GetAll`,
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
}