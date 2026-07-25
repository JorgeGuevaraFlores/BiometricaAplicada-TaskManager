import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TareaFormComponent } from '../../components/tarea-form/tarea-form.component';

import { Tarea } from '../../../../core/models/tarea.model';
import { TareaRequest } from '../../../../core/models/tarea-request.model';
import { TareaService } from '../../../../core/services/tarea.service';

@Component({
  selector: 'app-tarea-edit',
  standalone: true,
  imports: [
    TareaFormComponent
  ],
  templateUrl: './tarea-edit.component.html',
  styleUrl: './tarea-edit.component.css'
})
export class TareaEditComponent implements OnInit {

  tarea: Tarea | null = null;

  cargando = false;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tareaService: TareaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idTarea =
      this.activatedRoute.snapshot.paramMap.get('id');

    if (!idTarea) {
      this.router.navigate(['/tareas']);
      return;
    }

    this.obtenerTarea(idTarea);
  }

  obtenerTarea(idTarea: string): void {
    this.cargando = true;
    this.errorMessage = null;

    this.tareaService.getById(idTarea).subscribe({
      next: (result) => {
        if (result.correct && result.object) {
          this.tarea = result.object;
        } else {
          this.errorMessage =
            result.errorMessage ??
            'No fue posible obtener la tarea.';
        }

        this.cargando = false;
      },
      error: (error) => {
        console.error(
          'Error al obtener la tarea:',
          error
        );

        this.errorMessage =
          'Ocurrió un error al consultar la tarea.';

        this.cargando = false;
      }
    });
  }

  actualizarTarea(tareaRequest: TareaRequest): void {
    if (!this.tarea) {
      return;
    }

    const tareaActualizar: TareaRequest = {
      ...tareaRequest,
      idTarea: this.tarea.idTarea
    };

    this.tareaService.update(tareaActualizar).subscribe({
      next: (result) => {
        if (result.correct) {
          this.router.navigate(['/tareas']);
        } else {
          this.errorMessage =
            result.errorMessage ??
            'No fue posible actualizar la tarea.';
        }
      },
      error: (error) => {
        console.error(
          'Error al actualizar la tarea:',
          error
        );

        this.errorMessage =
          'Ocurrió un error al actualizar la tarea.';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/tareas']);
  }
}