import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { EventEmitter, Output } from '@angular/core';
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
export class UsuarioFormComponent implements OnInit {

  usuarioForm!: FormGroup;

  @Output() guardarUsuario = new EventEmitter<UsuarioRequest>();

  private readonly soloLetrasRegex = /^[\p{L}\s]+$/u;

  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,}$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
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
        [
          Validators.required,
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

  /**
   * Limpia todos los campos del formulario.
   */
  cancelar(): void {
    this.usuarioForm.reset();
  }
}