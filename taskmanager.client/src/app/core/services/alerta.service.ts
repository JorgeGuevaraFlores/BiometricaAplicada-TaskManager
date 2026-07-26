import { Injectable } from '@angular/core';

import Swal, {
    SweetAlertResult
} from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertaService {

    exito(
        titulo: string,
        mensaje: string
    ): Promise<SweetAlertResult<void>> {
        return Swal.fire({
            icon: 'success',
            title: titulo,
            text: mensaje,
            confirmButtonText: 'Aceptar'
        });
    }

    error(
        titulo: string,
        mensaje: string
    ): Promise<SweetAlertResult<void>> {
        return Swal.fire({
            icon: 'error',
            title: titulo,
            text: mensaje,
            confirmButtonText: 'Aceptar'
        });
    }

    advertencia(
        titulo: string,
        mensaje: string
    ): Promise<SweetAlertResult<void>> {
        return Swal.fire({
            icon: 'warning',
            title: titulo,
            text: mensaje,
            confirmButtonText: 'Aceptar'
        });
    }

    informacion(
        titulo: string,
        mensaje: string
    ): Promise<SweetAlertResult<void>> {
        return Swal.fire({
            icon: 'info',
            title: titulo,
            text: mensaje,
            confirmButtonText: 'Aceptar'
        });
    }

    confirmar(
        titulo: string,
        mensaje: string,
        textoConfirmar = 'Sí, continuar',
        textoCancelar = 'Cancelar'
    ): Promise<SweetAlertResult<boolean>> {
        return Swal.fire({
            icon: 'warning',
            title: titulo,
            text: mensaje,
            showCancelButton: true,
            confirmButtonText: textoConfirmar,
            cancelButtonText: textoCancelar,
            reverseButtons: true,
            focusCancel: true
        });
    }
}