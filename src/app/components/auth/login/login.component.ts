import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ErrorsFunction } from '../../errors/ErrorsFunction';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ErrorsFunction implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertService: AlertasService) {
    super();
   }

  ngOnInit() {
  }

  inicioSesion( form: NgForm ) {
    if (form.valid) {
      this.alertService.showLoading();
      this.authService.login(form.value)
      .subscribe(
        (user: any) => {
          console.log(user);
          this.alertService.hideLoading();
          this.router.navigate(['']);
        }, ((err: any) => {
          this.alertService.hideLoading();
          console.log(err);
        })
      );
    }
  }

}
