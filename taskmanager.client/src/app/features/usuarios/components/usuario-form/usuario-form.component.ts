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

  imagenSeleccionada: File | null = null;
  imagenPrevisualizacion: string | null = null;
  mensajeErrorImagen = '';

  private readonly tiposImagenPermitidos: string[] = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ];

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

    this.imagenPrevisualizacion = this.usuario.imagen
      ? `data:image/*;base64,${this.usuario.imagen}`
      : null;

    this.imagenSeleccionada = null;
    this.mensajeErrorImagen = '';
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
    if (this.usuarioForm.invalid || this.mensajeErrorImagen) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const valoresFormulario = this.usuarioForm.getRawValue();

    const usuarioRequest: UsuarioRequest = {
      nombre: valoresFormulario.nombre,
      apellidoPaterno: valoresFormulario.apellidoPaterno,
      apellidoMaterno: valoresFormulario.apellidoMaterno || null,
      correoElectronico: valoresFormulario.correoElectronico,
      password: valoresFormulario.password,
      imagen: this.imagenSeleccionada
    };

    this.guardarUsuario.emit(usuarioRequest);
  }

  cancelar(): void {
    this.usuarioForm.reset();
  }

  seleccionarImagen(event: Event): void {
    this.mensajeErrorImagen = '';

    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      this.imagenSeleccionada = null;
      this.imagenPrevisualizacion = null;
      return;
    }

    if (!this.tiposImagenPermitidos.includes(archivo.type)) {
      this.mensajeErrorImagen =
        'Solo se permiten imágenes JPG, PNG o WEBP.';

      this.imagenSeleccionada = null;
      this.imagenPrevisualizacion = null;
      input.value = '';

      return;
    }

    this.imagenSeleccionada = archivo;

    const lector = new FileReader();

    lector.onload = (): void => {
      this.imagenPrevisualizacion =
        typeof lector.result === 'string'
          ? lector.result
          : null;
    };

    lector.onerror = (): void => {
      this.mensajeErrorImagen =
        'No fue posible leer la imagen seleccionada.';

      this.imagenSeleccionada = null;
      this.imagenPrevisualizacion = null;
      input.value = '';
    };

    lector.readAsDataURL(archivo);
  }
}