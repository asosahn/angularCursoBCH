import { Component, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userActivity;
  userInactive: Subject<any> = new Subject();
  showLoading: Subscription;
  private loading$ = new Subject<any>();
 constructor() {

  // this.setTimeout();
  // this.userInactive.subscribe(() => {
  //   Swal.fire({
  //     title: 'Error!',
  //     text: 'Sesión de mas de 20 seg sin actividad',
  //     type: 'error',
  //     confirmButtonText: 'Aceptar'
  //   });
  // });
 }

//  setTimeout() {
//   this.userActivity = setTimeout(() => this.userInactive.next(undefined), 20000);
// }

// @HostListener('window:mousemove')
// @HostListener('window:keyup')
// refresUserState() {
//   clearTimeout(this.userActivity);
//   this.setTimeout();
// }
}
