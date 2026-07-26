import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Tarea } from '../../../../core/models/tarea.model';
import { PrioridadTarea } from '../../../../core/models/prioridadTarea.model';
import { EstadoTarea } from '../../../../core/models/estadoTarea.model';

import { TareaService } from '../../../../core/services/tarea.service';
import { PrioridadTareaService } from '../../../../core/services/prioridadTarea.service';
import { EstadoTareaService } from '../../../../core/services/estadoTarea.service';
import { AlertaService } from '../../../../core/services/alerta.service';

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

  prioridades: PrioridadTarea[] = [];
  idPrioridadSeleccionada = 0;

  estados: EstadoTarea[] = [];
  idEstadoSeleccionado = 0;

  cargando = false;
  errorMessage: string | null = null;

  constructor(
    private readonly tareaService: TareaService,
    private readonly prioridadTareaService: PrioridadTareaService,
    private readonly estadoTareaService: EstadoTareaService,
    private readonly alertaService: AlertaService
  ) { }

  ngOnInit(): void {
    this.obtenerTareas();
    this.obtenerPrioridades();
    this.obtenerEstados();
  }

  obtenerTareas(): void {
    this.cargando = true;
    this.errorMessage = null;

    const prioridad =
      this.idPrioridadSeleccionada === 0
        ? undefined
        : this.idPrioridadSeleccionada;

    const estado =
      this.idEstadoSeleccionado === 0
        ? undefined
        : this.idEstadoSeleccionado;

    this.tareaService
      .getAll(prioridad, estado)
      .subscribe({
        next: result => {
          if (result.correct) {
            this.tareas = result.objects ?? [];
          } else {
            this.errorMessage =
              result.errorMessage ??
              'No fue posible obtener las tareas.';
          }

          this.cargando = false;
        },
        error: error => {
          console.error(
            'Error al obtener las tareas:',
            error
          );

          this.errorMessage =
            'Ocurrió un error al consultar las tareas.';

          this.cargando = false;
        }
      });
  }

  obtenerPrioridades(): void {
    this.prioridadTareaService.getAll().subscribe({
      next: result => {
        if (result.correct) {
          this.prioridades = result.objects ?? [];
        }
      },
      error: error => {
        console.error(
          'Error al obtener las prioridades:',
          error
        );
      }
    });
  }

  obtenerEstados(): void {
    this.estadoTareaService.getAll().subscribe({
      next: result => {
        if (result.correct) {
          this.estados = result.objects ?? [];
        }
      },
      error: error => {
        console.error(
          'Error al obtener los estados:',
          error
        );
      }
    });
  }

  cambiarFiltroPrioridad(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.idPrioridadSeleccionada =
      Number(select.value);

    this.obtenerTareas();
  }

  cambiarFiltroEstado(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.idEstadoSeleccionado =
      Number(select.value);

    this.obtenerTareas();
  }

  async eliminarTarea(idTarea: string): Promise<void> {
    const confirmacion =
      await this.alertaService.confirmar(
        'Eliminar tarea',
        '¿Estás seguro de que deseas eliminar esta tarea?',
        'Sí, eliminar',
        'Cancelar'
      );

    if (!confirmacion.isConfirmed) {
      return;
    }

    this.tareaService.delete(idTarea).subscribe({
      next: async result => {
        if (result.correct) {
          await this.alertaService.exito(
            'Tarea eliminada',
            'La tarea se eliminó correctamente.'
          );

          this.obtenerTareas();
          return;
        }

        await this.alertaService.error(
          'No fue posible eliminar',
          result.errorMessage ??
          'No fue posible eliminar la tarea.'
        );
      },

      error: async error => {
        console.error(
          'Error al eliminar la tarea:',
          error
        );

        await this.alertaService.error(
          'Error al eliminar',
          error.error?.errorMessage ??
          'Ocurrió un error al eliminar la tarea.'
        );
      }
    });
  }
}