import { HttpErrorResponse } from '@angular/common/http';
import { ArtistsService, Artista } from './../../services/artists.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-artista',
  templateUrl: './agregar-artista.component.html',
  styleUrls: ['./agregar-artista.component.css']
})
export class AgregarArtistaComponent implements OnInit, AfterViewInit {
  loading = false;

  @ViewChild('formulario', null) miForma: any;

  constructor(private artistsService: ArtistsService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log(this.miForma);
  }

  guardarFormulario( formulario: NgForm ) {
    // entra si el formulario es válido
    if (formulario.valid) {
      this.loading = true;
      // ejecuta el metodo agregarArtista del servicio Artistas
      this.artistsService.agregarArtista(formulario.value).subscribe(
        ((artista: Artista | any) => {
          console.log(artista);
          // reset el formulario despues de que se haya creado el artista
          formulario.resetForm();
          this.loading = false;
          Swal.fire({
            title: 'Artista Agregado!',
            text: '',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        })
        // se captura el error
        , ((err: HttpErrorResponse | any) => {
          console.log(err);
          Swal.fire({
            title: 'Error!',
            text: err.error ? err.error.toString() : err.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
          this.loading = false;
        })
      );
    }
  }

  limpiarFormulario( formulario: NgForm) {

    formulario.resetForm();
  }

}
