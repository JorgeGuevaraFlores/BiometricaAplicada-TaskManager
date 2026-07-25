import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TareaFormComponent } from '../../components/tarea-form/tarea-form.component';
import { TareaRequest } from '../../../../core/models/tarea-request.model';
import { TareaService } from '../../../../core/services/tarea.service';

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
    private tareaService: TareaService,
    private router: Router
  ) { }

  guardarTarea(tarea: TareaRequest): void {
    this.tareaService.add(tarea).subscribe({
      next: (result) => {
        if (result.correct) {
          this.router.navigate(['/tareas']);
        }
      },
      error: (error) => {
        console.error('Error al agregar la tarea:', error);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/tareas']);
  }
}