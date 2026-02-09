import Swal, { SweetAlertResult } from "sweetalert2";

export async function questionAlert( text: string )
:Promise<SweetAlertResult<any>>{
    return await Swal.fire({
        title:'¿Desea Continuar?',
        text,
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#dc3545",
        icon: 'question',
        allowOutsideClick: false
    });
}