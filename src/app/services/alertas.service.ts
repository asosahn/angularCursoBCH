import { Subject, Observable } from 'rxjs';
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
  showLoadingSubject = new Subject<any>();
  constructor() { }
  mostrarVentana( params: AlertParametros & any ) {
    Swal.fire(params);
  }

  showLoading() {
    this.showLoadingSubject.next(true);
  }

  ShowOrHide(show: boolean) {
    this.showLoadingSubject.next(show);
  }

  hideLoading() {
    this.showLoadingSubject.next(false);
  }

  subscribeToLoadingSubject(): Observable<any> {
    return this.showLoadingSubject;
  }
}
