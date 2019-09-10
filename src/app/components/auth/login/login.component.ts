import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormErrors } from '../../errors/formErrors';
import { AlertasService } from 'src/app/services/alertas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormErrors implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private alertServices: AlertasService) {
  super();
}

ngOnInit() {
}

iniciarSesion(form: NgForm) {
  if (form.valid) {
    this.alertServices.ShowOrHide(true);
    this.authService.login(form.value)
      .subscribe(
        // recibo la respuesta del observable
        ((respuesta: any) => {
          console.log('respuesta ' + respuesta);
          this.alertServices.ShowOrHide(false);
          this.router.navigate(['/']);
        }),
        // recibo la respuesta de error
        ((error: HttpErrorResponse) => {
          this.alertServices.ShowOrHide(false);
          console.log('en componente login ', error);
        })
      );
  }
}
}
