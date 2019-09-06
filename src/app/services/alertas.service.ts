import { Subject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

interface AlertParametros {
  title: string;
  text: string;
  type: string;
  confirmButtonText: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  private loading = new Subject<any>();
  constructor() { }
  mostrarVentana( params: AlertParametros & any ) {
    Swal.fire(params);
  }

  showLoading() {
    this.loading.next(true);
  }

  hideLoading() {
    this.loading.next(false);
  }

  loadingSubscription(): Observable<any> {
    return this.loading.asObservable();
  }

}
