import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public title = 'Banco Central de Honduras';
  nombre = 'Ramon Sosa';
  nArtista = '';
  mostrar = true;
  artistas: any[] = [
    {
      nombre: 'Bon Jovi'
    },
    {
      nombre: 'Bruno Mars'
    },
    {
      nombre: 'Maná'
    },
    {
      nombre: 'Rata Blanca'
    },
  ];

  constructor() {
  }

  mostrarCard() {
    console.log('di click');
    this.mostrar = !this.mostrar;
  }

  agregarArtista() {
    // console.log(artista);
    if (this.nArtista === '' || this.nArtista === undefined) {
      return;
    }
    const preArtista: any = {
      nombre: this.nArtista
    };
    this.artistas.push(preArtista);
    this.nArtista = '';
  }

  borrarArtista(indice) {
    console.log(indice);
    this.artistas.splice(indice, 1);
  }
}

