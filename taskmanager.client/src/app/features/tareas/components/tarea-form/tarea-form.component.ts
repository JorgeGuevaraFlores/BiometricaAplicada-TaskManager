import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Tarea } from '../../../../core/models/tarea.model';

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
export class TareaFormComponent implements OnInit, OnChanges {

  @Input()
  tarea: Tarea | null = null;

  @Input()
  modo: 'crear' | 'editar' = 'crear';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarea'] && this.tarea) {
      this.tareaForm.patchValue({
        titulo: this.tarea.titulo,
        descripcion: this.tarea.descripcion,
        idEstadoTarea: this.tarea.idEstadoTarea,
        idPrioridadTarea: this.tarea.idPrioridadTarea
      });
    }
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

    const tareaRequest: TareaRequest = {
      ...this.tareaForm.value
    };

    if (this.modo === 'editar' && this.tarea) {
      tareaRequest.idTarea = this.tarea.idTarea;
    }

    this.guardarTarea.emit(tareaRequest);
  }

  cancelar(): void {
    this.cancelarFormulario.emit();
  }
}