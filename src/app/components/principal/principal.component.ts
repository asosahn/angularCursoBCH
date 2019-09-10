import { AuthService } from './../../services/auth/auth.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  userActivity: any;
  constructor(private alertService: AlertasService,
              private authService: AuthService) {
    // ejecutar función de revisión de tiempo
    this.setTimeoutBegin();
  }
  setTimeoutBegin() {
    this.userActivity = setTimeout(() => {
      this.timeOutSession();
    }, 60 * 60 * 1000);
  }
  timeOutSession() {
    this.alertService.mostrarVentana({
      title: 'Sesión Caducada',
      text: 'Tienes mas de 20 segundos sin usar la aplicación',
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
    this.setTimeoutBegin();
  }
  ngOnInit() {
  }
}
