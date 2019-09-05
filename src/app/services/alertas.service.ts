import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';


// title: 'Artista Agregado!',
// text: '',
// type: 'success',
// confirmButtonText: 'Aceptar'
interface AlertParametros {
  title: string;
  text: string;
  type: string;
  confirmButtonText: string;
}

// enum tipoVentanas {
//   success = 'success';
//   error = 'error';
// }

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }
  mostrarVentana( params: AlertParametros & any ) {
    Swal.fire(params);
  }
}
