import { Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { LoginComponent } from './features/auth/components/login/login.component';

import { UsuarioListComponent } from './features/usuarios/pages/usuario-list/usuario-list.component';
import { UsuarioAddComponent } from './features/usuarios/pages/usuario-add/usuario-add.component'
import { UsuarioEditComponent } from './features/usuarios/pages/usuario-edit/usuario-edit.component';
import { TareaListComponent } from './features/tareas/pages/tarea-list/tarea-list.component';
import { TareaAddComponent } from './features/tareas/pages/tarea-add/tarea-add.component';
import { TareaEditComponent } from './features/tareas/pages/tarea-edit/tarea-edit.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'usuarios',
                component: UsuarioListComponent,
                canActivate: [authGuard]
            },
            {
                path: 'usuarios/agregar',
                component: UsuarioAddComponent,
                canActivate: [authGuard]
            },
            {
                path: 'usuarios/editar/:id',
                component: UsuarioEditComponent,
                canActivate: [authGuard]
            },
            {
                path: 'tareas',
                component: TareaListComponent,
                canActivate: [authGuard]
            },
            {
                path: 'tareas/agregar',
                component: TareaAddComponent,
                canActivate: [authGuard]
            },
            {
                path: 'tareas/editar/:id',
                component: TareaEditComponent,
                canActivate: [authGuard]
            }
        ]
    },

    {
        path: '**',
        redirectTo: ''
    }
];