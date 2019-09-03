import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forma',
  templateUrl: './forma.component.html',
  styleUrls: ['./forma.component.css']
})
export class FormaComponent implements OnInit {
  countries: any[] = [];
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
    console.log(formulario);
  }

}
