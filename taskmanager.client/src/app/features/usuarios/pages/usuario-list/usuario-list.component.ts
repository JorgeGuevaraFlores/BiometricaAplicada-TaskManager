import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { Usuario } from '../../../../core/models/usuario.model';

import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    private readonly usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: (result) => {
        if (result.correct && result.objects) {
          this.usuarios = result.objects;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  eliminarUsuario(idUsuario: string): void {
    const confirmar = confirm(
      '¿Estás seguro de que deseas eliminar este usuario?'
    );

    if (!confirmar) {
      return;
    }

    this.usuarioService.delete(idUsuario).subscribe({
      next: (result) => {
        if (result.correct) {
          this.obtenerUsuarios();
        }
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    });
  }

  cambiarEstatus(usuario: Usuario): void {
    const nuevoEstatus = !usuario.activo;

    this.usuarioService
      .updateEstatus(usuario.idUsuario, nuevoEstatus)
      .subscribe({
        next: (result) => {
          if (result.correct) {
            usuario.activo = nuevoEstatus;
          }
        },
        error: (error) => {
          console.error(
            'Error al actualizar el estatus del usuario:',
            error
          );
        }
      });
  }
}