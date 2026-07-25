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
}