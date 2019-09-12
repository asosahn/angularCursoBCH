import { Subscription } from 'rxjs';
import { ArtistsService } from '../../services/artists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  artista: any = {};
  // SubscribeToChannelArtists: Subscription;
  constructor(private router: Router,
              private activedRoute: ActivatedRoute,
              private artistsService: ArtistsService) {


  }
  irAtras() {
    this.router.navigate(['/artistas']);
  }
  ngOnInit() {

    // con formato promesa
    ///////////////////////////////////
    this.activedRoute.params.subscribe(
      (params: any) => {
        this.artistsService.getArtistsById(params.id)
        .then((artista: any) => {
          this.artista = artista;
        })
        .catch((Err) => {
          console.log(Err);
        });
       }
    );
     //////////////////////////////////////////////
    // con async await (Promesa)

    // this.activedRoute.params.subscribe(
    //   async (params: any) => {
    //     console.log(params); // { id: <id> }
    //     this.artista = await this.artistsService.getArtistsById(params.id);
    //   }
    // );

    // con observable

    // this.activedRoute.params.subscribe(
    //   (params: any) => {
    //     console.log(params); // { id: <id> }
    //     // this.artista = this.artistsService.getArtistsById(params.id);
    //     this.artistsService.getArtistsById(params.id)
    //     .subscribe(artista => {
    //       this.artista = artista;
    //     }, (err) => {
    //       console.log(err);
    //     });
    //   }
    // );
  }

}
