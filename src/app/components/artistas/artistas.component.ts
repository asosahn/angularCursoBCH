import { ArtistsService } from '../../services/artists.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
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
    private artistsService: ArtistsService) {
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


    this.artistsService.getArtists()
      .subscribe(resp => {
        const preArtista = _.cloneDeep(resp);
        this.artistas = preArtista.map(artista => {
          artista.description = `${artista.description.substring(0, 100)} ...`;
          return artista;
        }, (err) => {
          console.log(err);
        });
      });
  }

  // ngOnDestroy() {
  //   console.log('onDestroy');
  // }

  irHome() {
    // this.router.navigate(['']);
  }

}
