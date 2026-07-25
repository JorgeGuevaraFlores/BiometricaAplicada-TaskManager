import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Tarea } from '../../../../core/models/tarea.model';
import { PrioridadTarea } from '../../../../core/models/prioridadTarea.model';

import { TareaService } from '../../../../core/services/tarea.service';
import { PrioridadTareaService } from '../../../../core/services/prioridadTarea.service';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent implements OnInit {

  tareas: Tarea[] = [];
  tareasFiltradas: Tarea[] = [];

  prioridades: PrioridadTarea[] = [];

  idPrioridadSeleccionada = 0;

  cargando = false;
  errorMessage: string | null = null;

  constructor(
    private tareaService: TareaService,
    private prioridadTareaService: PrioridadTareaService
  ) { }

  ngOnInit(): void {
    this.obtenerTareas();
    this.obtenerPrioridades();
  }

  obtenerTareas(): void {
    this.cargando = true;
    this.errorMessage = null;

    this.tareaService.getAll().subscribe({
      next: (result) => {
        if (result.correct) {
          this.tareas = result.objects ?? [];
          this.tareasFiltradas = [...this.tareas];

        } else {
          this.errorMessage =
            result.errorMessage ??
            'No fue posible obtener las tareas.';
        }

        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener las tareas:', error);

        this.errorMessage =
          'Ocurrió un error al consultar las tareas.';

        this.cargando = false;
      }
    });
  }

  obtenerPrioridades(): void {
    this.prioridadTareaService.getAll().subscribe({
      next: (result) => {
        if (result.correct) {
          this.prioridades = result.objects ?? [];
        }
      },
      error: (error) => {
        console.error(
          'Error al obtener las prioridades:',
          error
        );
      }
    });
  }

  cambiarFiltroPrioridad(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.idPrioridadSeleccionada = Number(select.value);

    if (this.idPrioridadSeleccionada === 0) {
      this.tareasFiltradas = [...this.tareas];
      return;
    }

    this.tareasFiltradas = this.tareas.filter(
      tarea =>
        Number(tarea.idPrioridadTarea) ===
        this.idPrioridadSeleccionada
    );

  }
}