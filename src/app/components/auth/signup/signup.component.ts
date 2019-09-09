import { AlertasService } from './../../../services/alertas.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormErrors } from '../../errors/formErrors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends FormErrors implements OnInit {
  form: FormGroup;
  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertasService) {
    super();
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', Validators.required),
      confpassword: new FormControl('')
    });
    this.form.controls.confpassword.setValidators([Validators.required, this.reviewPassword.bind(this.form)]);
  }
  singUp() {
    if (this.form.valid) {
      this.alertService.showLoading();
      this.authService.signUp(this.form.value).subscribe(
        ((res: boolean) => {
          this.alertService.hideLoading();
          this.router.navigate(['/']);
        }
        ), ((err: any) => {
          this.alertService.hideLoading();
        })
      );
    }
  }
  reviewPassword(control: FormControl): any {
    const forma: FormGroup = (this as unknown as FormGroup);
    if (control.value !== forma.controls['password'].value) {
      return {
        different: true
      };
    }
    return null;
  }

  ngOnInit() {
  }

}
