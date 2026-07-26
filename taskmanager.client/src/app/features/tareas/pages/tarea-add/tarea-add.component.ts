import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TareaFormComponent } from '../../components/tarea-form/tarea-form.component';

import { TareaRequest } from '../../../../core/models/tarea-request.model';

import { TareaService } from '../../../../core/services/tarea.service';
import { AlertaService } from '../../../../core/services/alerta.service';

@Component({
  selector: 'app-tarea-add',
  standalone: true,
  imports: [
    TareaFormComponent
  ],
  templateUrl: './tarea-add.component.html',
  styleUrl: './tarea-add.component.css'
})
export class TareaAddComponent {

  constructor(
    private readonly tareaService: TareaService,
    private readonly alertaService: AlertaService,
    private readonly router: Router
  ) { }

  guardarTarea(tarea: TareaRequest): void {
    this.tareaService.add(tarea).subscribe({
      next: async result => {
        if (result.correct) {
          await this.alertaService.exito(
            'Tarea registrada',
            'La tarea se registró correctamente.'
          );

          this.router.navigate(['/tareas']);
          return;
        }

        await this.alertaService.error(
          'No fue posible registrar',
          result.errorMessage ??
          'Ocurrió un error al registrar la tarea.'
        );
      },

      error: async error => {
        console.error(
          'Error al agregar la tarea:',
          error
        );

        await this.alertaService.error(
          'Error al registrar',
          error.error?.errorMessage ??
          'Ocurrió un error al registrar la tarea.'
        );
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/tareas']);
  }
}