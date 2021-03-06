import { SocketService } from './../../services/socket/socket.service';
import { Subscription, SubscriptionLike } from 'rxjs';
import { AlertasService } from './../../services/alertas.service';
import { ArtistsService } from '../../services/artists.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

// import { ArtistsService } from '../../services/artists.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.css']
})
export class ArtistasComponent implements OnInit, OnDestroy {


  artistas: any[] = [];
  suscriptionToNewArtists: Subscription;
  listenCreateArtists: Subscription;
  constructor(
    private router: Router,
    private artistsService: ArtistsService,
    private alertService: AlertasService,
    private socket: SocketService) {
    this.suscriptionToNewArtists = this.artistsService.canSubscribeToNewArtist().subscribe(
      ((newArtist) => {
        console.log('nuevo artista');
        this.artistas.unshift({...newArtist, description: newArtist.description.substring(0, 100)});
      })
    );

    this.listenCreateArtists = this.socket.onMessage('artist').subscribe(
      ((newArtist) => {
        this.artistas.unshift({...newArtist, description: newArtist.description.substring(0, 100)});
      })
    );
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

  ngOnDestroy(): void {
    this.suscriptionToNewArtists.unsubscribe();
    this.listenCreateArtists.unsubscribe();
  }

  SubStringArtistas(artistas: any) {
    return _.orderBy(artistas.map(artista => {
      artista.description = `${artista.description.substring(0, 100)} ...`;
      return artista;
    }), 'createdAt', 'desc');
  }

  ngOnInit() {
    // forma de promesa (then, catch)
    this.alertService.showLoading();
    this.artistsService.getArtists()
      .then(artistas => {
        const preArtistas = _.cloneDeep(artistas);
        this.artistas = this.SubStringArtistas(preArtistas);
        // this.artistas = preArtistas.map(artista => {
        //   artista.description = `${artista.description.substring(0, 100)} ...`;
        //   return artista;
        // });
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
