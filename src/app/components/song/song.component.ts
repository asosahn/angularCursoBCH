import { SongsService } from './../../services/songs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
// import { SongsSchema } from '../../services/songs.service';
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  cancion: {};
  alerta = false;
  constructor(private activatedRoute: ActivatedRoute,
              private songsService: SongsService,
              private router: Router) {
    // this.activatedRoute.params.subscribe(params => {
    //   // get song by id from songs service
    //   // debugger;
    //   this.cancion = this.songsService.getSongByName
    //   (params.name);
    //   console.log(this.cancion);
    // });
   }
   irAtras() {
    this.router.navigate(['songs']);
   }
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      // get song by id from songs service
      // debugger;
      this.cancion = await this.songsService.getSongByName
      (params.name);
      // import * as _ from 'lodash';
      if (_.isEmpty(this.cancion)) {
        this.alerta = true;
      }
      console.log(this.cancion);
    });
  }

}
