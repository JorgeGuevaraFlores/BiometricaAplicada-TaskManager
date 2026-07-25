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

import { Usuario } from '../../../../core/models/usuario.model';
import { UsuarioRequest } from '../../../../core/models/usuario-request.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit, OnChanges {

  usuarioForm!: FormGroup;

  @Input() usuario: Usuario | null = null;

  @Input() modo: 'crear' | 'editar' = 'crear';

  @Output() guardarUsuario = new EventEmitter<UsuarioRequest>();

  private readonly soloLetrasRegex = /^[\p{L}\s]+$/u;

  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,}$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();

    if (this.usuario) {
      this.cargarUsuario();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['usuario'] &&
      this.usuarioForm &&
      this.usuario
    ) {
      this.cargarUsuario();
    }
  }

  private cargarUsuario(): void {
    if (!this.usuario) {
      return;
    }

    this.usuarioForm.patchValue({
      nombre: this.usuario.nombre,
      apellidoPaterno: this.usuario.apellidoPaterno,
      apellidoMaterno: this.usuario.apellidoMaterno ?? '',
      correoElectronico: this.usuario.correoElectronico,
      password: ''
    });
  }

  private crearFormulario(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.soloLetrasRegex)
        ]
      ],

      apellidoPaterno: [
        '',
        [
          Validators.required,
          Validators.pattern(this.soloLetrasRegex)
        ]
      ],

      apellidoMaterno: [
        '',
        [
          Validators.pattern(this.soloLetrasRegex)
        ]
      ],

      correoElectronico: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        this.modo === 'crear'
          ? [
            Validators.required,
            Validators.pattern(this.passwordRegex)
          ]
          : [
            Validators.pattern(this.passwordRegex)
          ]
      ]
    });
  }

  guardar(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    console.log(this.usuarioForm.value);
    this.guardarUsuario.emit(this.usuarioForm.value);
  }

  cancelar(): void {
    this.usuarioForm.reset();
  }
}