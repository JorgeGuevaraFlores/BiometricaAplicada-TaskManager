import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { TareaRequest } from '../../../../core/models/tarea-request.model';

import { EstadoTarea } from '../../../../core/models/estadoTarea.model';
import { PrioridadTarea } from '../../../../core/models/prioridadTarea.model';

import { EstadoTareaService } from '../../../../core/services/estadoTarea.service';
import { PrioridadTareaService } from '../../../../core/services/prioridadTarea.service';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './tarea-form.component.html',
  styleUrl: './tarea-form.component.css'
})
export class TareaFormComponent implements OnInit {

  @Output()
  guardarTarea = new EventEmitter<TareaRequest>();

  @Output()
  cancelarFormulario = new EventEmitter<void>();


  estados: EstadoTarea[] = [];

  prioridades: PrioridadTarea[] = [];

  tareaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private estadoTareaService: EstadoTareaService,
    private prioridadTareaService: PrioridadTareaService
  ) {
    this.tareaForm = this.formBuilder.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.maxLength(150)
        ]
      ],
      descripcion: [
        '',
        Validators.maxLength(1000)
      ],
      idEstadoTarea: [
        '',
        Validators.required
      ],
      idPrioridadTarea: [
        '',
        Validators.required
      ]
    });
  }


  ngOnInit(): void {
    this.obtenerEstados();
    this.obtenerPrioridades();
  }

  obtenerEstados(): void {
    this.estadoTareaService.getAll().subscribe({
      next: (result) => {
        if (result.correct) {
          this.estados = result.objects ?? [];
        }
      },
      error: (error) => {
        console.error(
          'Error al obtener los estados:',
          error
        );
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




  guardar(): void {
    if (this.tareaForm.invalid) {
      this.tareaForm.markAllAsTouched();
      return;
    }

    this.guardarTarea.emit(this.tareaForm.value);
  }

  cancelar(): void {
    this.cancelarFormulario.emit();
  }
}