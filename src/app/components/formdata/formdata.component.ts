import { UploadService } from './../../services/upload.service';
import { AlertasService } from './../../services/alertas.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formdata',
  templateUrl: './formdata.component.html',
  styleUrls: ['./formdata.component.css']
})
export class FormdataComponent implements OnInit {

  form: FormGroup;
  user: any = {
    name: 'Andres',
    lastName: 'Sosa',
    gender: 'm',
    email: 'ramonsosadiaz@gmail.com',
    skills: ['Hola', 'Angular'],
    country: 'HN',
    password: 'sosadiaz',
    confpassword: 'sosadiaz',
    // avatar: {
    //   name: '',
    //   lastModified: '',
    //   lastModifiedDate: '',
    //   size: null,
    //   type: ''
    // }
    avatar: ''
  };
  countries: any[];
  files;
  allFiles: any[] = [];
  uploadResponse = { status: '', message: undefined, filePath: '' };
  image: any = '';
  constructor(private http: HttpClient, private alertService: AlertasService, private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private uploadService: UploadService) {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required], this.exists),
      skills: new FormArray([]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      gender: new FormControl(''),
      country: new FormControl(''),
      password: new FormControl(''),
      confpassword: new FormControl(''),
      // avatar: new FormGroup({
      //   name: new FormControl(''),
      //   lastModified: new FormControl(''),
      //   lastModifiedDate: new FormControl(''),
      //   size: new FormControl(0),
      //   type: new FormControl(''),
      // })
      avatar: new FormControl('')
    });
    // this.toastr.success('Hello world!', 'Toastr fun!');
    // this.form = new FormGroup({});
    // Object.keys(this.user).forEach((campo => {
    //   if ( this.user[campo] instanceof Array ) {
    //     this.form.addControl(campo, new FormArray([]));
    //   } else {
    //     this.form.addControl(campo, new FormControl(''));
    //   }
    // }));

    // (this.form.controls.skills as FormArray).push(new FormControl('Hola', Validators.required));

    // this.user.skills.forEach(item => {
    //   (this.form.controls.skills as FormArray).push(new FormControl(item));
    // });


    // this.form.valueChanges.subscribe(data => console.log(data));
    // this.form.controls.name.valueChanges.subscribe(data => console.log(data));
    // this.form.controls.name.setValue('Ramon');
    // this.form.controls.lastName.setValue('Sosa');

    // validación de confirmación de password
    // tslint:disable-next-line:max-line-length
    this.form.controls.confpassword.setValidators([Validators.required, this.reviewPassword.bind(this.form)]);
    // se envía como this la forma a la función

    Object.keys(this.user).forEach((item) => {
      if (this.user[item] instanceof Array) {
        this.user[item].forEach(item2 => {
          (this.form.controls[item] as FormArray).push(new FormControl(item2));
        });
      }
    });

    this.form.setValue(this.user);
  }

  ngOnInit() {
    this.http.get('https://restcountries.eu/rest/v2/')
      .subscribe(
        (countries: any[]) => {
          this.countries = countries;

        }
      );
    this.uploadService.files().subscribe(
      (data => {
        this.allFiles = data;
      })
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
    console.log(this.form);
    this.validateAllFormFields(this.form);
    if (this.form.valid) {
      const formData = new FormData();
      const values = this.form.value;
      formData.append('file', values.avatar[0], values.avatar[0].name);
      delete values.avatar;
      formData.append('body', JSON.stringify(values));

      this.uploadService.upload(formData, this.form.value).subscribe(
        ((res: any) => {
          if (res && res.status === 'progress') {
            this.uploadResponse = res;
            // tslint:disable-next-line:triple-equals
            if (res.message == 100) {
              this.uploadResponse.message = undefined;
            }
          } else if (res.originalname) {
            this.allFiles.push(res);
          }
        }),
        err => console.log(err)
      );
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

  reviewPassword(control: FormControl): any {
    const forma: FormGroup = (this as unknown as FormGroup);
    if (control.value !== forma.controls.password.value) {
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

  changeFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      this.files = file;
      this.form.controls['avatar'].setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(this.files[0]);
      reader.onload = () => {
        this.image = reader.result;
      };
    }
  }

  download(file: any) {
    this.uploadService.download(file).subscribe(
      (res =>  console.log(res))
    );

  }

}
