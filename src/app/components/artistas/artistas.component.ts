import { AlertasService } from './../../services/alertas.service';
import { ArtistsService } from '../../services/artists.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// import { ArtistsService } from '../../services/artists.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent implements OnInit {

  artistas: any[] = [];

  constructor(
    private router: Router,
    private artistsService: ArtistsService,
    private alertService: AlertasService) {

    //  this.activedRouter.params.subscribe(params => {
    //    console.log(params);
    //  });
    // const preArtista = this.artistsService.getArtists().map(artista => Object.assign({}, artista));
    // const preArtista = this.artistsService.getArtists().map(artista => ({...artista }));

    // const preArtista = _.cloneDeep(this.artistsService.getArtists());

    // this.artistas = preArtista.map(artista => {
    //   artista.description = `${artista.description.substring(0, 100)} ...`;
    //   return artista;
    // });
    // console.log(this.artistas);
  }

  verMas(eventChild: any) {
    console.log('recibí en padre ' + eventChild);
    this.router.navigate(['/artist', eventChild]);
  }


  ngOnInit() {
    // forma de promesa (then, catch)
    this.alertService.showLoading();
    this.artistsService.getArtists()
      .then(artistas => {
        const preArtistas = _.cloneDeep(artistas);
        this.artistas = preArtistas.map(artista => {
          artista.description = `${artista.description.substring(0, 100)} ...`;
          return artista;
        });
        this.alertService.hideLoading();
      })
      .catch((err) => {
        this.alertService.hideLoading();
        console.log(err);
      });


    // con la manera async

    // const preArtista = await this.artistsService.getArtists();
    // const cloneArtistas = _.cloneDeep(preArtista);
    // this.artistas = cloneArtistas.map(artista => {
    //   artista.description = `${artista.description.substring(0, 100)} ...`;
    //   return artista;
    // });

    // ejemplo con observable (subscribe)

    // this.artistsService.getArtists()
    //   .subscribe(resp => {
    //     const preArtista = _.cloneDeep(resp);
    //     this.artistas = preArtista.map(artista => {
    //       artista.description = `${artista.description.substring(0, 100)} ...`;
    //       return artista;
    //     }, (err) => {
    //       console.log(err);
    //     });
    //   });
  }

  // ngOnDestroy() {
  //   console.log('onDestroy');
  // }

  irHome() {
    // this.router.navigate(['']);
  }

}
