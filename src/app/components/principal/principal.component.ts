import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  // userInactive = new Subject();
  userActivity;
  constructor(private authService: AuthService) {

    this.setTimeout();
  //   this.userInactive.subscribe(() => {
  //   Swal.fire({
  //     title: 'Error!',
  //     text: 'Sesión de mas de 20 seg sin actividad',
  //     type: 'error',
  //     confirmButtonText: 'Aceptar'
  //   });
  //   setTimeout(() => {
  //     this.authService.logOut().subscribe();
  //   }, 1000);
  // });
  }

  ngOnInit() {
  }

  // setTimeout() {
  //     this.userActivity = setTimeout(() => this.userInactive.next(), 20000);
  //   }
  setTimeout() {
      this.userActivity = setTimeout(() => this.timeOutSession(), 5 * 60 * 1000);
    }
    timeOutSession() {
      Swal.fire({
        title: 'Error!',
        text: 'Sesión de mas de 20 seg sin actividad',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
      setTimeout(() => {
        this.authService.logOut().subscribe();
      }, 1000);
    }

@HostListener('window:mousemove')
@HostListener('window:keyup')
refresUserState() {
  clearTimeout(this.userActivity);
  this.setTimeout();
}

}
