import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formdata',
  templateUrl: './formdata.component.html',
  styleUrls: ['./formdata.component.css']
})
export class FormdataComponent implements OnInit {
  form: FormGroup;
  user: {} = {
    name: '',
    lastName: '',
    gender: '',
    email: '',
    skills: [],
    country: ''
  };

  countries: any[] = [
    {
      code: 'hn',
      name: 'Honduras',
    },
    {
      code: 'pty',
      name: 'Panamá',
    },
    {
      code: 'es',
      name: 'El Salvador',
    },
  ];
  constructor(private http: HttpClient) {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required], this.exists),
      skills: new FormArray([
      ]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      gender: new FormControl(''),
      country: new FormControl('')
    });

    // tslint:disable-next-line:max-line-length
    // this.form.controls['password2'].setValidators([Validators.required, this.reviewPassword.bind(this.form)]);

    // setear valores por defecto a la forma
    // this.form.setValue({ ...this.user, password: '', password2: '' });
    // ver cambios en tiempo real de la forma
    // this.form.valueChanges.subscribe(data => console.log(data));

    // ver cambios de un campo en especial
    // (this.form.controls.fullName as FormGroup).controls.name.valueChanges.subscribe(data => console.log(data));
    // ((this.form.controls['fullName'] as FormGroup).controls['name'] as FormControl).valueChanges.subscribe(data => console.log(data));

    // ejemplo básico
    // this.form = new FormGroup({
    //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   description: new FormControl('', Validators.required),
    //   image: new FormControl('', Validators.required),
    // });

  }

  ngOnInit() {
    this.http.get('https://restcountries.eu/rest/v2/')
      .subscribe(
        (countries: any[]) => {
          this.countries = countries;
        }
      );
  }



  isInvalid(control: string) {
    return this.form.get(control).errors && this.form.get(control).touched;
  }
  returnErrors(control: string) {
    return this.form.controls[control].errors;
    // otra manera de acceder...
    // return this.form.get(control).errors;
  }
  saveForm() {
    // this.form.markAsDirty({ onlySelf: true });
    console.log(this.form);
    this.validateAllFormFields(this.form);
    if (this.form.valid) {
      console.log(this.form.value);
      console.log(this.form);
    }
    // this.form.reset();

  }

  validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const currentControl = form.get(field);
      if (currentControl instanceof FormControl) {
        currentControl.markAsTouched({ onlySelf: true });
      } else if (currentControl instanceof FormArray) {
        (currentControl.controls as Array<FormControl>).forEach(item => {
          item.markAsTouched({ onlySelf: true });
        });
      } else if (currentControl instanceof FormGroup) {
        this.validateAllFormFields(currentControl);
      }
    });

  }

  reviewPassword(control: FormControl): { [s: string]: boolean } {
    const form: FormGroup = (this as unknown as FormGroup);
    if (control.value !== form.controls['password'].value) {
      return {
        different: true
      };
    }

    return null;
  }

  exists(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value.toLowerCase() === 'Ramon Sosa'.toLowerCase()) {
          resolve({ exists: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
  exists2(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>('http://bch.hazsk.com/artist', { params: { name: control.value } }).subscribe(
        ((res: any) => {
          if (res.length > 0) {
            resolve({ exists: true });
          } else {
            resolve(null);
          }
        }), (err => {
          resolve(null);
        })
      );
    });
  }
  customValidation(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Sosa') {
      return {
        mana: true
      };
    }
    return null;
  }

  addSkills() {
    (this.form.controls.skills as FormArray).push(new FormControl('', Validators.required));
  }

}
