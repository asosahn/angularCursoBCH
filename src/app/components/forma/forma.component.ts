import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Cliente {
  name: string;
  lastName: string;
  gender: string;
  email: string;
  country: string;
}

@Component({
  selector: 'app-forma',
  templateUrl: './forma.component.html',
  styleUrls: ['./forma.component.css']
})
export class FormaComponent implements OnInit, AfterViewInit {
  @ViewChild('formulario', null) form: NgForm;
  countries: any[] = [];
  cliente: Cliente = {
    name: 'Andres',
    lastName: 'Sosa',
    email: 'ramonsosadiaz@gmail.com',
    gender: 'm',
    country: 'HN'
  };
  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    console.log('entro al after init');
    console.log(this.form.value);
    setTimeout(() => {
      console.log(this.form.value);
    });
  }

  ngOnInit() {
    this.http.get('https://restcountries.eu/rest/v2/')
    .subscribe(
      (countries: any[]) => {
        this.countries = countries;
      }
    );
  }

  guardarFormulario( formulario: NgForm ) {
    if (formulario.valid) {
      // request al api
      console.log(formulario);
      console.log('formulario válido');

      formulario.resetForm();
      console.log(formulario);
    } else {
      console.log(formulario);
      console.log('formulario inválido');
    }
  }

  limpiarFormulario( formulario: NgForm ) {
    formulario.resetForm(this.cliente);
  }

}


