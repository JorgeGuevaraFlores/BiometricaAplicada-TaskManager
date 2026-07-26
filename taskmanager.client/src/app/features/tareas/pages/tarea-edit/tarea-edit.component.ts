import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TareaFormComponent } from '../../components/tarea-form/tarea-form.component';

import { Tarea } from '../../../../core/models/tarea.model';
import { TareaRequest } from '../../../../core/models/tarea-request.model';

import { TareaService } from '../../../../core/services/tarea.service';
import { AlertaService } from '../../../../core/services/alerta.service';

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly tareaService: TareaService,
    private readonly alertaService: AlertaService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const idTarea =
      this.activatedRoute.snapshot.paramMap.get('id');

    if (!idTarea) {
      this.alertaService.error(
        'Tarea no encontrada',
        'No se proporcionó un identificador de tarea válido.'
      ).then(() => {
        this.router.navigate(['/tareas']);
      });

      return;
    }

    this.obtenerTarea(idTarea);
  }

  obtenerTarea(idTarea: string): void {
    this.cargando = true;
    this.errorMessage = null;

    this.tareaService.getById(idTarea).subscribe({
      next: async result => {
        if (result.correct && result.object) {
          this.tarea = result.object;
          this.cargando = false;
          return;
        }

        this.cargando = false;

        await this.alertaService.error(
          'No fue posible consultar la tarea',
          result.errorMessage ??
          'No fue posible obtener la tarea.'
        );

        this.router.navigate(['/tareas']);
      },

      error: async error => {
        console.error(
          'Error al obtener la tarea:',
          error
        );

        this.cargando = false;

        await this.alertaService.error(
          'Error al consultar',
          error.error?.errorMessage ??
          'Ocurrió un error al consultar la tarea.'
        );

        this.router.navigate(['/tareas']);
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
      next: async result => {
        if (result.correct) {
          await this.alertaService.exito(
            'Tarea actualizada',
            'La tarea se actualizó correctamente.'
          );

          this.router.navigate(['/tareas']);
          return;
        }

        await this.alertaService.error(
          'No fue posible actualizar',
          result.errorMessage ??
          'No fue posible actualizar la tarea.'
        );
      },

      error: async error => {
        console.error(
          'Error al actualizar la tarea:',
          error
        );

        await this.alertaService.error(
          'Error al actualizar',
          error.error?.errorMessage ??
          'Ocurrió un error al actualizar la tarea.'
        );
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/tareas']);
  }
}