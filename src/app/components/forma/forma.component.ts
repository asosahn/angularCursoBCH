import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class FormaComponent implements OnInit {
  countries: any[] = [];
  cliente: Cliente = {
    name: 'Andres',
    lastName: 'Sosa',
    email: 'ramonsosadiaz@gmail.com',
    gender: 'm',
    country: 'HN'
  };
  constructor(private http: HttpClient) { }

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


